const { usertModel } =  require ('../../models/user.model.js')


class userManagerMongo {
    constructor(){
        this.model = usertModel
    }
    getUsers   = async () => await this.model.find({})
    getUser   = async opts => await this.model.findOne({'_id':opts}) 
    createUser = async newUser => await this.model.create(newUser)
    deleteUser = async opts => await this.model.deleteOne({'_id':opts})
    updateUser = async (id, upData) =>await this.model.updateOne({'_id':id, upData})

} 

module.exports = {
    userManagerMongo
}