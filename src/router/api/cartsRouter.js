const {Router} = require('express')
const { cartManagerMongo } = require('../../daos/Momgo/cartManagerMongo')

const cartService = new cartManagerMongo()
const router = Router()




router.post('/', async (req, res) => {
    try {
        const {body} = req
        if(!title || !code ||  !price || !category){
            return res(404).send({ status: 'error', message: 'debe completar los campos obligatorios' })
        }      const response = await cartService.createcart(body)
                    res.send({status: 'success', payload: response})
    } catch (ERROR) {
        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al cargarr el carrito' })
    }
})

router.get('/', async (req, res) => {
    try {
        console.log('llegue al get cartos')
        const carts =  await cartService.getcarts()
            if (!getcarts) {
                return res.status(404).send({ status: 'error', message: 'carrito no encontrado' });
                }
                res.send({status:'succes', playload: carts})
        
                   
    }catch (ERROR){
        
        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el carrito' })
    }
    
})

router.get('/:pid', async (req, res) => {
    try {
        console.log('seleccion de carro por ID')
        const {pid} = req.params
            const cart =  await cartService.getcart(pid)
                if (!cart) {
                    return res.status(404).send({ status: 'error', message: 'carrito no encontrado' });
                 }
        
                      res.send({status:'succes', playload: cart})
                   
    }catch (ERROR){
        
        console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el carro' })
    }
})

router.put('/:pid', async (req, res) => {
    try{
        console.log('ingrese al PUT Carro')
        const pid = req.params
        const body = req.body
            const carro = await cartService.updatecart(pid,body)
            if (!carro) {
                return res.status(404).send({ status: 'error', message: 'carrito no Modificado' });
             }    
                  res.send({status:'succes', playload: carro})               
    }catch (ERROR){
    
         console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el carrito' })
                    
    } 
})

router.delete('/:pid', async (req,res) =>{
    try {
        console.log('Llegue al delete carro')

        const pid = req.params
            const carro = await cartService.deletecart(pid)
                 if (!carro) {
                     return res.status(404).send({ status: 'error', message: 'carrito no Borrado' });
                     }    
                        res.send({status:'succes', playload: carro})               
                }catch (ERROR){
    
                     console.log('Error:', ERROR);
                         res.status(500).send({ status: 'error', message: 'Error al borrar el carrito' })
                    
    } 
})







module.exports = router