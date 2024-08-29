const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo')
const { productManagerMongo } = require('../../daos/Momgo/productManagerMongo')

const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const router = Router()

router.get('/carts', async (req, res) => {
    try {
        
        const carts = await cartService.getcarts()
        res.render('cart', {
        title: 'Carritos de Compras',
        carts: carts

        });
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los carritos' })
    }
})

router.get('/products', async (req, res) => {
    try {
       
        const products = await productService.getProducts()

        
        res.render('products', {
            title: 'Lista de Productos',
            products: products
        });
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos' })
    }
})

module.exports = router;
