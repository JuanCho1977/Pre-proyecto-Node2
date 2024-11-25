
class userRepository {
    constructor(dao){
        this.dao = dao
    }
    getusers   = async () => await this.dao.get()
    getuser = async id => await this.dao.getBy();
    createuser = async newuser => await this.dao.create(newuser)
    deleteuser = async opts => await this.dao.delete({'_id':opts})
    updateuser = async (id, upData) =>await this.dao.update({'_id':id, upData})

} 

module.exports = {
    userRepository
}