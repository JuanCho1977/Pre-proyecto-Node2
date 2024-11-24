const { connect }       = require("mongoose");
const {MongoSingleton}  = require ('../utils/MongoSingleton.js')
const dotenv            = require('dotenv')
const { program }       = requier ('../utils/commander.js')
 


const {mode} = program.opts()
dotenv.config({
    path: mode ==='development'?'./.env.development' : './.env.production'
})

exports.configObject = {
    port:           process.env.PORT || 8080,
    private_key:    process.env.PRIVATE_KEY,
    URL:            process.env.MOMGO_URL,
    PalabClav:      process.env.PALABRACLAVE

}

module.exports.connectDb = async () => {


    //console.log('la base de datos esta conectada')
    //await connect('mongodb+srv://gonzalezinsfranjm:PmOLcH5O8FLyJCts@cluster0.54olv.mongodb.net/')
    //await connect('mongodb://localhost:27017/HTLM001')

    return await MongoSingleton.getInstance()
}