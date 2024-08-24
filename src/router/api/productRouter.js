const {Router} = require('express')
const { productManagerMongo } = require('../../daos/Momgo/productManagerMongo')

const productService = new productManagerMongo()
const router = Router()




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
        console.log('llegue al get productos')
        const products =  await productService.getProducts()
        res.send ({status: 'succes', playload:products})
    } catch (ERROR) {
        console.log(ERROR)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        console.log('seleccion de producto por ID')
        const {pid} = req.params
    const id =  await productService.getProduct(pid)
    res.send({status:'succes', playload: id})
    }catch (ERROR){
        console.log (ERROR)
    }
})

router.put('/:pid', async (req, res) => {
    try{
        console.log('ingrese al PUT')
        const pid = req.params
        const body = req.body
            const producto = await productService.updateProduct(pid,body)
                res.send({status: 'succes', playload: producto})
        
    } catch (ERROR){
        console.log (ERROR)
    }
})

router.delete('/:pid', async (req,res) =>{
    try {
        console.log('Llegue al delete product')

        const pid = req.params
            const producto = await productService.deleteProduct(pid)
                res.send({status: 'succes', playload: producto})

    }catch (ERROR) {

        console.log(ERROR)
    }
})





module.exports = router


//try {
//
//} catch (e) {
//    
//    console.error("ERROR!")
//} 