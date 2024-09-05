const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo.js')
const { productManagerMongo } = require('../../src/daos/Momgo/productManagerMongo.js')
const { MemoryDatabase } = require('../../src/daos/Memory/memory.js')


const mongoose = require('mongoose') 
const { cartsModel } = require('../models/cart.model.js')
const { productModel } = require('../models/products.model.js')

const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const memoryDatabase = new MemoryDatabase()
const router = Router()

router.post('/carts', async (req, res) => {
    try {
        console.log("Estoy en el POST de Carritos");
        const { productId } = req.body;

        console.log(`ID de producto recibido: ${productId}`)

        
        const carts = memoryDatabase.addProductToCart(productId)

        if (!carts || carts.length === 0) {
            return res.status(404).send({ status: 'error', message: 'No se encontraron productos en el carrito' })
        }

        // voy al memory
        const products = await productService.getProducts(); // Cambia a obtener todos los productos
        const cartProducts = products.filter(product => carts.includes(product._id.toString()))

        res.render('product', {
            title: 'Carritos de Compras',
            products: cartProducts 
        });
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos del carrito' })
    }
});


router.post('/carts/delete', async (req, res) => {
    try {
        console.log("Estoy en el DELETE de Carritos")
        const { productId } = req.body;

        console.log(`ID de producto a eliminar: ${productId}`)

        
        const carts = memoryDatabase.removeProductFromCart(productId)

        // Obtengo los detalles del producto desde la base de datos MEMORY
        const products = await productService.getProducts();
        const cartProducts = products.filter(product => carts.includes(product._id.toString()))

        res.render('product', {
            title: 'Carritos de Compras',
            products: cartProducts
        })
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al eliminar el producto del carrito' })
    }
});
router.post('/carts/data', async (req, res) => {
    
    try {
        console.log("ingrese al POST DATA de Carrito")
        const cartProducts = memoryDatabase.getCart()
        console.log("Productos a transferir a MongoDB:", cartProducts)
  
        const Carts = await cartService.getcarts()
            if(Carts) {
                const vacioCart = Carts.find(c => Array.isArray(c.ProductID) && c.ProductID.length === 0)
  
                if (vacioCart) {
        
                 await cartService.updatecart(vacioCart._id, { $push: { ProductID: cartProducts.map(productId => new mongoose.Types.ObjectId(productId)) } } )
                 
                } else {
      
                    const newCart = await cartService.createcart({ ProductID: cartProducts.map(productId => new mongoose.Types.ObjectId(productId)) })
           
  
                    memoryDatabase.clearCart()
                    res.render('product', { title: 'Carritos de Compras' })

                    res.send({ status: 'success', payload: newCart })
                 }
            } else { return res.status(404).send({ status: 'error', message: 'No hay carritos disponibles.' })
        } 
    }  catch (ERROR) {
                console.log('Error:', ERROR)
                res.status(500).send({ status: 'error', message: 'Error al crear el carrito' })
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

       const {limit, page} = req.query

       console.log (limit)
       if(!limit || !page ){
        console.log("ingreso valor invalido")
        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
        
           }else { 
                const products = await productModel.paginate({},{limit, page})
                console.log(products)
                const productSinId = await products.docs.map( products => {
                    const{id,...rest} = products.toObject()
                    return rest
                    
                })
                console.log(productSinId)
                res.render('product', {
            
                title: 'Lista de Productos',
                products: productSinId,
                currentPage: products.Page,
                totalPages: products.totalPages,
                hasNextPage: products.hasNextPage,
                hasPreviousPage: products.hasPreviousPage,
                nextPage: products.nextPage,
                previousPage: products.previousPage,
                
                })
    }
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos' })
    }
})
module.exports = router;
