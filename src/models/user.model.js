const {Schema, model} = require('mongoose')
const collectionName = 'users'


const userSchema = new Schema({
    
    first_name: {
        type:String,
        required: true
        
    },
    last_name: { 
        type:String
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
   password: {
    type: String,
    unique: true
   },

   role:{
    type: String,
    enum: ['user','user_premium', 'admin'],
    default: 'user'

   },

    birthdate: String, // como seria dd/mm/aaaa????
    nationality: String,
    Location: String,

   
    
    create: {
        type: Date,
        default:Date.now
    } 



})

const userModel = model(collectionName, userSchema)

module.exports = {
    userModel
}