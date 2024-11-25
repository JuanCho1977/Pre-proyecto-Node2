const { productModel } =  require ('../../models/products.model.js')


class productDaoMongo {
    constructor(){
        this.model = productModel
    }
    get   = async () => await this.model.find({}).lean()
    getBy = async id => await this.model.findOne({ '_id': id }).lean();
    create = async newProduct => await this.model.create(newProduct)
    delete = async opts => await this.model.deleteOne({'_id':opts})
    update = async (id, upData) =>await this.model.updateOne({'_id':id, upData})

} 

module.exports = {
    productDaoMongo
}