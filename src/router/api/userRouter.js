const {Router} = require('express')
const { passportCall } = require('../../middeware/passport/passportCall.js')
const  {UserControler}  = require ('../../controllers/user.controller.js')


const router = Router()



const userController = new UserControler()

router.post('/newuser',                     userController.creatUser )

router.get('/users', passportCall('jwt'),    userController.getUsers )

router.get('/user/:pid',                    userController.getUser)

router.put('/user/:pid',                    userController.UpdateUser )

router.delete('/:pid',                      userController.deleteUser)



module.exports = {
    router
}