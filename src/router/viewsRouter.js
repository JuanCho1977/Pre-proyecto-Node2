const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo.js')
const { productManagerMongo } = require('../../src/daos/Momgo/productManagerMongo.js')
const mongoose = require('mongoose');
const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const router = Router()


router.post('/carts', async (req, res) => {
    try {
        console.log("estoy en el POST de Carritos")
        const { productId } = req.body;

        console.log(`ID de producto recibido: ${productId }`)
        
        const carts = await cartService.createcart(productId )
          
        if (!carts || carts.length == 0) {
            return res.status(404).send({ status: 'error', message: 'No se encontraron carritos' })

        }
        res.render('carts', {
            title: 'Carritos de Compras',
            carts: carts
        }) 
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los carritos' })
    }
})

router.get('/products/search', async (req, res) => {
  try {
     console.log("estoy en el GETs PRODUCT x id")
      const {id} = req.query
      console.log(id)
      if (!id || !mongoose.Types.ObjectId.isValid(id) ) {
          console.log("ingreso un codigo invalido")
        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
       }
      const products = await productService.getProduct(id)
      console.log(products)
      res.render('product', {
          
          title: 'Lista de Productos',
          products: [products]
      })
  } catch (ERROR) {
      console.log('Error:', ERROR);
      res.status(500).send({ status: 'error', message: 'Error al obtener los productos' })
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
//