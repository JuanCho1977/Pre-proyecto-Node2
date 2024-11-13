const { cartDaoMongo } = require("../daos/Momgo/cartDaoMongo");
const { productDaoMongo } = require("../daos/Momgo/productDaoMongo");
const { userDaoMongo } = require("../daos/Momgo/userDaoMongo");

const userService       = new userDaoMongo()

const productService    = new productDaoMongo()

const cartService       = new cartDaoMongo()



module.exports = {
    userService,
    productService,
    cartService
}