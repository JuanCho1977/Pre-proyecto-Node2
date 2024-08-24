//const { create } = require('domain')
//const {Schema, model, trusted} = require('mongoose')
//const { type } = require('os')
//const { title } = require('process')
//const { stream } = require('undici-types')
const {Schema, model} = require('mongoose')// este fue la instruccion inicial el resto de instrucciones de pusieron solas
const collectionName = 'products'


const productSchema = new Schema({
    
    title: {
        type:String,
        required: true
    },
    
    code: {
        type: String,
        required: true,
        unique: true
    },
   
    thumbnall: String,
    price: Number,
    stock: Number,
   
    category:{

        type: String,
        require: true
    },
    create: {
        type: Date,
        default:Date.now
    }



})

const productModel = model('collectionName', productSchema)
module.exports = {productModel}