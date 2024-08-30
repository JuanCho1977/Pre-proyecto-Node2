const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo.js')
const { productManagerMongo } = require('../../src/daos/Momgo/productManagerMongo.js')

const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const router = Router()


router.get('/carts', async (req, res) => {
    try {
        console.log("estoy en el Get de Carritos")
        const carts = await cartService.getcarts()
          console.log("estoy dentro de GET carritos")
                res.render('carts', {
                title: 'Carritos de Compras',
                carts: carts
            }) 
            if (!carts || carts.length == 0) {
            return res.status(404).send({ status: 'error', message: 'No se encontraron carritos' })

        }
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los carritos' })
    }
})

router.get('/products', async (req, res) => {
    try {
       console.log("estoy en el GETs PRODUCTS")
        const products = await productService.getProducts()

        
        res.render('product', {
            
            title: 'Lista de Productos',
            products: products
        })
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos' })
    }
})

module.exports = router;
