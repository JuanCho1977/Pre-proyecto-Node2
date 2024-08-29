const {Schema, model} = require('mongoose')// este fue la instruccion inicial el resto de instrucciones de pusieron solas
const collectionName = 'carts'


const cartSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    
    create: {
        type: Date,
        default:Date.now
    }



})
exports.cartstModel = model(collectionName, cartSchema)

