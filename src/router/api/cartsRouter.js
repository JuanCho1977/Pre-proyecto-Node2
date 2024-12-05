const {Router}              = require('express')
const { cartController }  = require( '../../controllers/cart.controller.js')
const router = Router()

const CartController = new cartController()


router.post('/add',     CartController.createcart );

router.get('/carts',    CartController.getcarts);

router.get('/cart/:id',  CartController.getcart );

router.put('/cart/:id', CartController.updatecart);

router.delete('/:id',   CartController.deletecart);



module.exports = {
    router
}