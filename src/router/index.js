const {Router} = require ('express')
const productRouter = require('./api/productRouter.js')
const cartsRouter = require('./api/cartsRouter.js')
const userRoute = require ('./api/userRouter.js')
const menssageRouter = require('./api/MenssageRouter.js')
const viewRouter  = require ('./viewsRouter.js')

const router =  Router()

router.use('/', viewRouter)
router.use('/api/product', productRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/user', userRoute)
router.use('/api/menssage', menssageRouter)




module.exports = router