const { userModel } =  require ('../../models/user.model.js')


class userDaoMongo {
    constructor(){
        this.model = userModel
    }
    getUsers   = async (filter) => await this.model.find(filter)
    getUser   = async  (filter)=> await this.model.findOne(filter)
    createUser = async newUser => await this.model.create(newUser)
    deleteUser = async opts => await this.model.deleteOne({'_id':opts})
    updateUser = async (id, upData) =>await this.model.updateOne({'_id':id}, upData)

} 

module.exports = {
    userDaoMongo
}