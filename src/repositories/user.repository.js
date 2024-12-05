
class userRepository {
    constructor(dao){
        this.dao = dao
    }
    getUsers   = async () => await this.dao.get()
    getUser = async id => await this.dao.getBy();
    creatUser = async newuser => await this.dao.create(newuser)
    deleteUser = async opts => await this.dao.delete({'_id':opts})
    updateUser = async (id, upData) =>await this.dao.update({'_id':id, upData})

} 

module.exports =  userRepository
