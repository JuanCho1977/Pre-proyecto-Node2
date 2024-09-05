
const {Schema, model} = require('mongoose')
const mongoosePaginate = require( "mongoose-paginate-v2" )

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
   
    thumbnail: String,
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
productSchema.plugin(mongoosePaginate)
exports.productModel = model(collectionName, productSchema)
