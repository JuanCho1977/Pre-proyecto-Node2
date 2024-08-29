const { cartsModel } =  require ('../../models/cart.model.js')


class cartManagerMongo {
    constructor(){
        this.model = cartsModel
    }
    getcarts   = async () => await this.model.find({})
    getcart    = async id => await this.model.findOne({'_id':id}) 
    createcart = async newCart => await this.model.create(newCart)
    deletecart = async (id) => await this.model.deleteOne({'_id':id})
    updatecart = async (id, upData) =>await this.model.updateOne({'_id':id, upData})

} 

module.exports = {
    cartManagerMongo
}
