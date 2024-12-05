const {Router}              = require('express')
const  {productController}  = require ('../../controllers/product.controller.js')

const router = Router();

const ProductController = new productController();

router.post('/product',     ProductController.createProduct);

router.get('/search',       ProductController.getProducts );

router.get('/:pid',         ProductController.getProduct);

router.put('/:pid',         ProductController.updateProduct );

router.delete('/:pid',      ProductController.deleteProduct );





module.exports ={
    router
}

