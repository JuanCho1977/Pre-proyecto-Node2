
const express   =  require ('express')
const routerApp =  require('./router/index.js')
const { connectDb } = require('./config/index.js')
const path = require('path')
const {create} = require('express-handlebars')
const passport = require('passport')
const { initializePassport } = require('./config/passport.config')


const cookieParser = require ('cookie-parser')
const session = require ('express-session')
//const FileStore = require ('session-file-store')
const MongoStore = require ('connect-mongo')


const app       = express()
const PORT   = process.env.PORT ||  8080


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'public'))
app.use(cookieParser('palabrasecreta')) //la palabra secreta deberia estar en el .env de cookieParse
//app.use(logger('dev'))



app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/HTLM001',
        // mongoOptions: {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // },
        ttl: 1000000000000
    }),
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

connectDb()

const handlebars = create({ defaultLayout: 'main' })

app.engine('handlebars', handlebars.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')


app.use(routerApp)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('erro de server')
})



app.listen(PORT, err => {
    if (err) console.log(err)
    console.log (`servidor escuchando en el ${PORT}`)
})
