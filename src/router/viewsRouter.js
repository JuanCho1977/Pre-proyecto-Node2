const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo.js')
const { productManagerMongo } = require('../../src/daos/Momgo/productManagerMongo.js')
const { MemoryDatabase } = require('../../src/daos/Memory/memory.js')


const mongoose = require('mongoose'); 
const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const memoryDatabase = new MemoryDatabase()
const router = Router()

router.post('/carts', async (req, res) => {
    try {
        console.log("Estoy en el POST de Carritos");
        const { productId } = req.body;

        console.log(`ID de producto recibido: ${productId}`);

        
        const carts = memoryDatabase.addProductToCart(productId);

        if (!carts || carts.length === 0) {
            return res.status(404).send({ status: 'error', message: 'No se encontraron productos en el carrito' });
        }

        // voy al memory
        const products = await productService.getProducts(); // Cambia a obtener todos los productos
        const cartProducts = products.filter(product => carts.includes(product._id.toString()));

        res.render('product', {
            title: 'Carritos de Compras',
            products: cartProducts 
        });
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los productos del carrito' });
    }
});


router.post('/carts/delete', async (req, res) => {
    try {
        console.log("Estoy en el DELETE de Carritos");
        const { productId } = req.body;

        console.log(`ID de producto a eliminar: ${productId}`);

        
        const carts = memoryDatabase.removeProductFromCart(productId);

        // Obtengo los detalles del producto desde la base de datos MEMORY
        const products = await productService.getProducts();
        const cartProducts = products.filter(product => carts.includes(product._id.toString()));

        res.render('product', {
            title: 'Carritos de Compras',
            products: cartProducts
        })
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al eliminar el producto del carrito' });
    }
});
router.post('/carts/data', async (req, res) => {
    try {
        console.log("ingrese al POST DATA de Carrito")
        const { productId  } = req.body;
            if (!productId ) {
                return res.status(400).send({ status: 'error', message: 'Debe completar los campos obligatorios' });
            }
            console.log(` ID POST DATA de Carrito ${productId}`)
            const carts = memoryDatabase.removeProductFromCart(productId)
            const products = await productService.getProducts()
            const cartProducts = products.filter(product => carts.includes(product._id.toString()))
            const resCart = await cartService.createcart(cartProducts)
            console.log(cartProducts)
            res.render('product', {
            title: 'Carritos de Compras enviado'
            })
           
            res.send({ status: 'success', payload: resCart })
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al crear el carrito' });
    }
});

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