const { productModel } =  require ('../../models/products.model.js')


class productManagerMongo {
    constructor(){
        this.model = productModel
    }
    getProducts   = async () => await this.model.find({})
    getProduct    = async opts => await this.model.findOne(opts) // {}
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async DelProduct  => await this.model.deleteOne(opts)
    updateProduct = async actualizarProduct =>await this.model.updateOne(opts)

} 

module.exports = {
    productManagerMongo
}