const {Router} = require('express')
const router = Router()
router.post ('/', (req, res) =>{
    res.send('post de carrito')
})

router.get('/', (req, res) => {
    res.send ('estos son todos los carritos')
})

router.get('/:pid', (req, res) => {
    res.send('Este es el Carrito')
})

router.put('/:pid', (req, res) => {
    res.send('Actualice el Carrito')
})

router.delete('/:pid', (req,res) =>{
    res.send('borramos el Carrito')
})







module.exports = router