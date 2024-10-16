const { Router } = require('express')
const { cartManagerMongo } = require('../../src/daos/Momgo/cartManagerMongo.js')
const { productManagerMongo } = require('../../src/daos/Momgo/productManagerMongo.js')
const { MemoryDatabase } = require('../../src/daos/Memory/memory.js')
const {autenticacion} = require ('../middeware/auth.middleware.js')

const mongoose = require('mongoose') 
const { cartsModel } = require('../models/cart.model.js')
const { productModel } = require('../models/products.model.js')

const cartService = new cartManagerMongo()
const productService = new productManagerMongo()
const memoryDatabase = new MemoryDatabase()
const router = Router()


router.get('/carts', async (req, res) => {
    try {
        console.log("Estoy en GETCARRITO")
        const carts = await cartService.getcarts();
            if (!carts || carts.length === 0) {
                return res.status(404).send({ status: 'error', message: 'No se encontraron carritos' });
            }
            
            console.log(carts)

            res.render('carts', { title: 'Carritos de Compras',
                carts: carts
             })

    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al obtener los carritos' });
    }
});

router.post('/carts/deletecart', async (req, res) => {
    try {
        console.log("Estoy en el DELETE de Cart")
        const { cartsId } = req.body;

        console.log(`ID de producto a eliminar: ${cartsId}`)

        const cartsdel = await cartService.deletecart(cartsId)
        const carts = await cartService.getcarts()
        res.render('carts', {
            title: 'Carritos de Compras eliminado',
            carts: carts
            
        })
    } catch (ERROR) {
        console.log('Error:', ERROR);
        res.status(500).send({ status: 'error', message: 'Error al eliminar el producto del carrito' })
    }
});

router.post('/carts', async (req, res) => {
    try {
        console.log("Estoy en el POSTMemo de Carritos");
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

        res.render('products', {
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
        console.log(Carts)
            if(Carts) {
                const vacioCart = Carts.find(c => Array.isArray(c.ProductID) && c.ProductID.length === 0)
  
                if (vacioCart) {
        
                    const newCart = await cartService.updatecart(vacioCart._id, { $push: { ProductID: cartProducts.map(productId => new mongoose.Types.ObjectId(productId)) } } )
                    console.log(newCart)
                } else {
                        
                        const newCart = await cartService.createcart({ ProductID: cartProducts.map(productId => new mongoose.Types.ObjectId(productId)) })
                        console.log(newCart)
                        res.render('carts', { title: 'Carritos de Compras',
                            carts: newCart
                         })
                     
                        memoryDatabase.clearCart()
                    

                    
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
        let page = req.query.page || 1
       let limit = req.query.limit || 1

       console.log (page)
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
                currentPage: products.page,
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

router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})






module.exports = router;
