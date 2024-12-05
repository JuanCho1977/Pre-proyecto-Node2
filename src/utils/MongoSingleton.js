
const { connent } = require("mongoose")
const { configObject } = require("../config/index.js")

class MongoSingleton {
    static #instance
    constructor () {
        connent( configObject.URL)
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