const { cartsModel } =  require ('../../models/cart.model.js')


class cartManagerMongo {
    constructor(){
        this.model = cartsModel
    }
    getcarts   = async () => {
        const carts = await this.model.find({}).lean();
        return carts || []
    }
    getcart    = async id => await this.model.findOne({'_id':id}) 
    createcart = async productId => await this.model.create(productId)
    deletecart = async (id) => await this.model.deleteOne({'_id':id})
    updatecart = async (id, upData) =>await this.model.updateOne({'_id':id}, upData)

} 

module.exports = {
    cartManagerMongo
}
