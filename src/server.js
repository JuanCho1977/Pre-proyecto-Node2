
const express   =  require ('express')
//const handlebars =  require ('express-handlebars')
const routerApp =  require('./router/index.js')
const { connectDb } = require('./config/index.js')
const path = require('path')
const {create} = require('express-handlebars')

const app       = express()
const PORT      = 8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'public'))

connectDb()

const handlebars = create({ defaultLayout: 'main' })

app.engine('handlebars', handlebars.engine)
//app.engine('handlebars',handlebars.engine)
//app.set('views', __dirname+'/views')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')


app.use(routerApp)





app.listen(PORT, err => {
    if (err) console.log(err)
    console.log (`servidor escuchando en el ${PORT}`)
})
