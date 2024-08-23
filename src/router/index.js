const {Router} = require ('express')
const router =  Router()
const productRouter = require('./api/productRouter.js')
const cartsRouter = require('./api/cartsRouter.js')
const userRoute = require ('./api/userRouter.js')
const menssageRouter = require('./api/MenssageRouter.js')

router.use('/', () => {})
router.use('/api/products', productRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/user', userRoute)
router.use('/api/menssage', menssageRouter)




module.exports = router