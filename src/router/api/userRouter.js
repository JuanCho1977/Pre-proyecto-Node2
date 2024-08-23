const {Router} = require('express')
const router = Router()

router.post ('/', (req, res) =>{
    res.send('post del usuario')
})

router.get('/', (req, res) => {
    res.send ('estos son todos los Usuario')
})

router.get('/:pid', (req, res) => {
    res.send('Este es el Usuario')
})

router.put('/:pid', (req, res) => {
    res.send('Actualice a el Usuario')
})

router.delete('/:pid', (req,res) =>{
    res.send('borramos el Usuarios')
})








module.exports = router