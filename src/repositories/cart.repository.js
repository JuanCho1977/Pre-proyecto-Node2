class cartRepository {
    constructor(dao){
        this.dao = dao
    }
    getcarts   = async () => await this.dao.get()
    getcart = async id => await this.dao.getBy();
    createcart = async newcart => await this.dao.create(newcart)
    deletecart = async opts => await this.dao.delete({'_id':opts})
    updatecart = async (id, upData) =>await this.dao.update({'_id':id, upData})

} 

module.exports = cartRepository
