const {Schema, model} = require('mongoose')// este fue la instruccion inicial el resto de instrucciones de pusieron solas
const collectionName = 'user'


const userSchema = new Schema({
    
    Name: {
        type:String,
        required: true
    },
    
    email: {
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

const productModel = model('collectionName', productSchema)
module.exports = {productModel}