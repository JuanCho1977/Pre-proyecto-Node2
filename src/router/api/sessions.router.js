const { Router }            = require('express')
const { authentication }    = require('../../middeware/auth.middleware.js')
const {userManagerMongo }  = require('../../daos/Momgo/userManagerMongo.js')
const { createHash, isValidPassword } = require('../../utils/bcrypt.js')
const { generateToken }     = require ('../../utils/jwt.js')
const passport = require('passport')

const router = Router()
const userService = new userManagerMongo()


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
        role: userFound.role === 'admin'
    })
    res.send({
        status: 'success',
        message: 'Usuario loggeado',
        token
    })

    
})
router.get('/failogin', async (req, res) => {
    console.log('fallo la estrategia login')
    res.send({status: 'error', error: 'fallo el login'})
})


router.get('/current', authentication, (req, res) => {
    res.send('datos sensibles')
})


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



// router.post('/register', async (req, res) => {
//     const {first_name, last_name, email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
//     }

//     const userFound = await userServise.getUser({email})
//     if (userFound) {
//         return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
//     }

//     const newUser = {
//         first_name, 
//         last_name,
//         email,
//         password: createHash(password)
//     }

//     const result = await userServise.createUser(newUser)

//     res.redirect('/login')
// })


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     // console.log(email, password)
//     const userFound = await userServise.getUser({email})
//     console.log(userFound)
//     if (!userFound) {
//         return res.send({stauts: 'error', error: 'no existe el usuario'})
//     }

//     // if (userFound.email !== email || userFound.password !== password) {
//     //     return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
//     // }
    
//     if (isValidPassword(password, userFound.password)) {
//         return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
//     }

//     req.session.user = {
//         email,
//         isAdmin: userFound.role === 'admin'
//     }

//     res.send('logueado correctamente')
// })



module.exports = router