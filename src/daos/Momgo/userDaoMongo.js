const { userModel } =  require ('../../models/user.model.js')


class userDaoMongo {
    constructor(){
        this.model = userModel
    }
    get  = async (filter) => await this.model.find(filter)
    getBy  = async  (filter)=> await this.model.findOne(filter)
    create = async newUser => await this.model.create(newUser)
    delete = async opts => await this.model.deleteOne({'_id':opts})
    update = async (id, upData) =>await this.model.updateOne({'_id':id}, upData)

} 

module.exports = {
    userDaoMongo
}