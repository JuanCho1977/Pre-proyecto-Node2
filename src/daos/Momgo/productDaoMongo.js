const { productModel } =  require ('../../models/products.model.js')


class productDaoMongo {
    constructor(){
        this.model = productModel
    }
    getProducts   = async () => await this.model.find({}).lean()
    getProduct = async id => await this.model.findOne({ '_id': id }).lean();
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne({'_id':opts})
    updateProduct = async (id, upData) =>await this.model.updateOne({'_id':id, upData})

} 

module.exports = {
    productDaoMongo
}