const { Router }            = require('express')
//const { authentication }    = require('../../middeware/auth.middleware.js')
const { UserControler }  = require ('../../controllers/user.controller.js')
const { createHash, isValidPassword } = require('../../utils/bcrypt.js')
const { generateToken }     = require ('../../utils/jwt.js')
const passport = require('passport')
const { authTokenMiddleware } =  require('../../utils/jwt.js')
const { passportCall } = require('../../middeware/passport/passportCall.js')
const { authorization } = require('../../middeware/passport/authorization.middleware.js')

const router = Router()

const userService = new UserControler()


router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
    console.log("pase por el register")
    const { first_name, last_name, email, password } = req.body
    console.log(first_name, last_name, email, password);
    if( !first_name ||!last_name ||!email || !password) 
        return res.status(400).send({stauts: 'success', message: 'ERROR todos los campos son requeridos'});

    const userFound = await userService.getUser({email});
    console.log(userFound);

    if(userFound) 
        return res.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'});

    const newUser = {
        first_name,
        last_name, 
        email,
        password: createHash(password) 
    };

    let result = await userService.createUser(newUser)
    console.log(result)
    

    res.send({
        status: 'success',
        message: 'usuario registrado',
        data: result
    });


})
router.get('/failregister', async (req, res) => {
    console.log('fallo la estrategia')
    res.send({status: 'error', error: 'fallo estrategia'})
})

router.post('/login',async (req, res) => {
    
    const { email, password } = req.body;

    if(!email || !password) 
        return res.status(400).send({stauts: 'success', message: 'todos los campos son requeridos'});
    console.log (email,password)
    const userFound = await userService.getUser({email});
    console.log(userFound)
    if(!userFound) 
        return res.status(401).send({status: 'error', message: 'No se encuentra el usuario con ese email'});

    
    if(!isValidPassword(password, userFound.password)) 
        return res.send({status: 'error', message: 'las credenciales no coinciden'});
    
    

    const token = generateToken({
        id: userFound._id,
        email: userFound.email, 
        role: userFound.role === 'admin'// preguntamos si es admin y devolvemos un true o  flase que viaja a jwt.js
    })
    res.cookie('token', token,{
        maxAge:1000*60*60*24,
        httpOnly: true //para evitar que se vea en el document.cookies, que sea accesible en una consulta http

    }).send({
        status: 'success',
        message: 'Usuario loggeado',
        token
    })

    
})
router.get('/failogin', async (req, res) => {
    console.log('fallo la estrategia login')
    res.send({status: 'error', error: 'fallo el login'})
})



router.get('/current', passportCall('jwt'), authorization('admin'), async (req , res) => {
    res.send({datauser: req.user, message:'datos sensibles'});
});


//router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//    res.send({datauser: req.user, masasage:'datos sensibles'})
//})



router.post('/changepass', async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    const userFound = await userServise.getUser({email})
    // console.log(userFound)
    if (!userFound) {
        return res.send({stauts: 'error', error: 'no existe el usuario'})
    }

    // const result = await userServise.updateuser()

    res.send('se a cambiado correctamente la contraseña')
})


router.get('/logout', (req, res)=> {
    req.session.destroy( error => {
        if (error) return res.send({status: 'error', error})
    })
    res.send('logout')
})



module.exports = router