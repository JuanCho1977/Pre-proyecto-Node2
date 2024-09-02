const {Schema, model} = require('mongoose')
const collectionName = 'carts'


const cartSchema = new Schema({
    
    title: {
        type: String,
        
    },
    ProductID: {
        type: Object,
        required: true

    },
    
    create: {
        type: Date,
        default:Date.now
    }



})
exports.cartsModel = model(collectionName, cartSchema)

