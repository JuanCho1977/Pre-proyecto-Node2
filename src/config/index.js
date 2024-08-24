const { connect } = require("mongoose");

exports.connectDb = async () => {
    console.log('la base de datos esta conectada')
    await connect('mongodb://127.0.0.1:27017/HTML001/products')
}