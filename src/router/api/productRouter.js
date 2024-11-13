const {Router}              = require('express')
const { productController } = require ('../../controllers/product.controller.js')

const router = Router();

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = new productController();

router.post('/product',     createProduct);

router.get('/search',       getProducts );

router.get('/:pid',         getProduct);

router.put('/:pid',         updateProduct );

router.delete('/:pid',      deleteProduct );





module.exports ={
    router
}

