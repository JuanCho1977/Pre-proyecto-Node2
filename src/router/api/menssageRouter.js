const {Router} = require('express')
const router = Router()
router.post ('/', (req, res) =>{
    res.send('post del mensaje')
})

router.get('/', (req, res) => {
    res.send ('estos son todos los mensajes')
})

router.get('/:pid', (req, res) => {
    res.send('Este es el mensaje')
})

router.put('/:pid', (req, res) => {
    res.send('Actualice a el mensaje')
})

router.delete('/:pid', (req,res) =>{
    res.send('borramos el mensaje')
})







module.exports = router