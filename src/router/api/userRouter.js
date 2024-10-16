const {Router} = require('express')
const { userManagerMongo} = require('../../daos/Momgo/userManagerMongo.js')


const userService = new userManagerMongo()
const router = Router()




router.post('/newuser', async (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body
        if(!first_name || !last_name ||  !email || !password){
            return res.status(404).send({ status: 'error', message: 'debe completar los campos obligatorios' })
        }      const newUser = await userService.createUser(req.body)
                    res.send({status: 'success', payload: newUser})
    } catch (ERROR) {

        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al cargarr el Usuario' })
    }
})

router.get('/users', async (req, res) => {
    try {
        console.log('llegue al get Usuarios')
        const users =  await userService.getUsers()
            if (!getusers) {
                return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
                }
                res.send({status:'succes', playload: users})
                           
    }catch (ERROR){
        
        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el Usuario' })
    }
    
})

router.get('/user/:pid', async (req, res) => {
    try {
        console.log('seleccion de Usuario por ID')
        const {pid} = req.params
            const user =  await userService.getUser(pid)
                if (!user) {
                    return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
                 }
        
                      res.send({status:'succes', playload: user})
                   
    }catch (ERROR){
        
        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el Usuario' })
    }
})

router.put('/user/:pid', async (req, res) => {
    try{
        console.log('ingrese al PUT')
        const pid = req.params
        const body = req.body
            const Usuario = await userService.updateUser(pid,body)
            if (!Usuario) {
                return res.status(404).send({ status: 'error', message: 'Usuario no Modificado' });
             }    
                  res.send({status:'succes', playload: Usuario})               
    }catch (ERROR){
    
         console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el Usuario' })
                    
    } 
})

router.delete('/:pid', async (req,res) =>{
    try {
        console.log('Llegue al delete user')

        const pid = req.params
            const Usuario = await userService.deleteUser(pid)
                 if (!Usuario) {
                     return res.status(404).send({ status: 'error', message: 'Usuario no Borrado' });
                     }    
                        res.send({status:'succes', playload: Usuario})               
                }catch (ERROR){
    
                     console.log('Error:', ERROR);
                         res.status(500).send({ status: 'error', message: 'Error al borrar el Usuario' })
                    
    } 
})







module.exports = router