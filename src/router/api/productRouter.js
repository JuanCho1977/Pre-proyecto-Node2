const {Router} = require('express')
const { ProductManagerMongo } = require('../../daos/Momgo/productManagerMongo')
const router = Router()
const productService = new ProductManagerMongo




router.post('/', async (req, res) => {
    try {
        const {body} = req
        // mas validaciones
        const response = await productService.createProduct(body)
        res.send({status: 'success', payload: response})
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const products =  await productService.getProductst()
        res.send ({status: 'succes', playload:products})
    } catch (ERROR) {
        console.log(ERROR)
    }
})

router.get('/:pid', async (req, res) => {
    res.send('Este es el producto')
})

router.put('/:pid', async (req, res) => {
    res.send('Actualice el prodcto')
})

router.delete('/:pid', async (req,res) =>{
    res.send('borramos el producto')
})





module.exports = router


//try {
//
//} catch (e) {
//    
//    console.error("ERROR!")
//} 