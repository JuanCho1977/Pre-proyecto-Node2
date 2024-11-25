const { cartsModel } =  require ('../../models/cart.model.js')


class cartDaoMongo {
    constructor(){
        this.model = cartsModel
    }
    get   = async () => {
        const carts = await this.model.find({}).lean();
        return carts || []
    }
    getBy    = async id => await this.model.findOne({'_id':id}) 
    create = async productId => await this.model.create(productId)
    delete = async (id) => await this.model.deleteOne({'_id':id})
    update = async (id, upData) =>await this.model.updateOne({'_id':id}, upData)

} 

module.exports = {
    cartDaoMongo
}
