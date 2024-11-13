const {Router} = require ('express')
const productRouter = require('./api/productRouter.js')
const cartsRouter = require('./api/cartsRouter.js')
const userRouter = require ('./api/userRouter.js')
const menssageRouter = require('./api/MenssageRouter.js')
const viewRouter  = require ('./viewsRouter.js')
const pruebasRouter = require ('./api/pruebasRouter.js')
const sessionRouter = require ('./api/sessions.router.js')

const router =  Router()

router.use('/', viewRouter)
router.use('/api/product', productRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/user', userRouter)
router.use('/api/menssage', menssageRouter)
router.use('/pruebas', pruebasRouter)
router.use('/api/sessions', sessionRouter)



module.exports = router