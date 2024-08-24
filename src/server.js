
const express   =  require ('express')
const routerApp =  require('./router/index.js')
const { connectDb } = require('./config/index.js')

const app       = express()
const PORT      = 8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDb()
app.use(routerApp)


app.get('/', (req , res) => {
    res.send ('Funcionando')

})


app.listen(PORT, err => {
    if (err) console.log(err)
    console.log (`servidor escuchando en el ${PORT}`)
})
