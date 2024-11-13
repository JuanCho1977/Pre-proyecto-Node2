
const { connent } = require("mongoose")


class MongoSingleton {
    static #instance
    constructor () {
        connent('mongodb+srv://gonzalezinsfranjm:PmOLcH5O8FLyJCts@cluster0.54olv.mongodb.net/')
    }
    static getInstance(){
        if(this.#instance){
            cosole.log('Base de datos ya conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de datos conectada')
        return this.#instance
    }


}



module.esports = {
    MongoSingleton
}