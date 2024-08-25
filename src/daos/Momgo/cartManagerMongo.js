const { cartsModel } =  require ('../../models/cart.model.js')


class cartManagerMongo {
    constructor(){
        this.model = cartsModel
    }
    getcarts   = async () => await this.model.find({})
    getcart    = async opts => await this.model.findOne({'_id':opts}) 
    createcart = async newCart => await this.model.create(newCart)
    deletecart = async opts => await this.model.deleteOne({'_id':opts})
    updatecart = async (id, upData) =>await this.model.updateOne({'_id':id, upData})

} 

module.exports = {
    cartManagerMongo
}