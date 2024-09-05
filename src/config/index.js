const { connect } = require("mongoose");

exports.connectDb = async () => {
    console.log('la base de datos esta conectada')
    await connect('mongodb+srv://gonzalezinsfranjm:PmOLcH5O8FLyJCts@cluster0.54olv.mongodb.net/')
}