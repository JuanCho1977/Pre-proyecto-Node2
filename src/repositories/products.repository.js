

class productRepository {
    constructor(dao){
        this.dao = dao
    }
    getProducts   = async () => await this.dao.get()
    getProduct = async id => await this.dao.getBy();
    createProduct = async newProduct => await this.dao.create(newProduct)
    deleteProduct = async opts => await this.dao.delete({'_id':opts})
    updateProduct = async (id, upData) =>await this.dao.update({'_id':id, upData})

} 

module.exports = productRepository
