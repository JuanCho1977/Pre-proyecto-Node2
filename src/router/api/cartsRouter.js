const {Router}              = require('express')
const { cartController }    = require( '../../controllers/cart.controller.js')
const router = Router()

const {
    createcar.
    getcarts,
    getcart.
    updatecart,
    deletecart

} = new cartController


router.post('/add',     createcart );

router.get('/carts',    getcarts);

router.get('/cart/:id',  getcart );

router.put('/cart/:id', updatecart);

router.delete('/:id',   deletecart);



module.exports = {
    router
}