const {Schema, model} = require('mongoose')// este fue la instruccion inicial el resto de instrucciones de pusieron solas
const collectionName = 'user'


const userSchema = new Schema({
    
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    thumbnall: String,
    birthdate: String, // como seria dd/mm/aaaa????
    nationality: String,
    Location: String,

   
    
    create: {
        type: Date,
        default:Date.now
    }



})

exports.userModel = model(collectionName, userSchema)
