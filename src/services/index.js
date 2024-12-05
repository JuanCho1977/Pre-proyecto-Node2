const { cartDaoMongo } = require("../daos/Momgo/cartDaoMongo.js");
const cartRepository  = require("../repositories/cart.repository.js")
const { productDaoMongo } = require("../daos/Momgo/productDaoMongo.js");
const ProductRepository = require("../repositories/products.repository.js")
const { userDaoMongo } = require("../daos/Momgo/userDaoMongo.js");
const userRepository = require("../repositories/user.repository.js")

const userService       = new userRepository (new userDaoMongo())

const productService    = new ProductRepository (new productDaoMongo())

const cartService       = new cartRepository (new cartDaoMongo())



module.exports = {
    userService,
    productService,
    cartService
}