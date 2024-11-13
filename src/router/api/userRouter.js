const {Router} = require('express')
const { passportCall } = require('../../middeware/passport/passportCall.js')
const { UserControler }  = require ('../../controllers/user.controller.js')

const router = Router()

const {

    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser

} = new UserControler()

router.post('/newuser',                     createUser )

router.get('/users', passportCall('jwt'),   getUsers )

router.get('/user/:pid',                    getUser)

router.put('/user/:pid',                    updateUser )

router.delete('/:pid',                      deleteUser)



module.exports = {
    router
}