const { create } = require('domain')
const {Schema, model, trusted} = require('mongoose')
const { type } = require('os')
const { title } = require('process')
const { stream } = require('undici-types')

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
   
    thumbnall: string,
    price: Number,
    stock: Number,
   
    category:{

        type: string,
        require: true
    },
    create: {
        type: Date,
        default:Date.now
    }



})

const productModel = model('products', productSchema)
