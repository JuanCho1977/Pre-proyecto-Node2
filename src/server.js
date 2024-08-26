
const express   =  require ('express')
const handlebars =  require ('express-handlebars')
const routerApp =  require('./router/index.js')
const { connectDb } = require('./config/index.js')


const app       = express()
const PORT      = 8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDb()


app.engine('handlebars',handlebars.engine)
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use(routerApp)





app.listen(PORT, err => {
    if (err) console.log(err)
    console.log (`servidor escuchando en el ${PORT}`)
})
