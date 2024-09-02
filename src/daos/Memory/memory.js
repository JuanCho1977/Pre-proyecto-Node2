
class MemoryDatabase {
    constructor() {
        this.cart = []  

    }
    addProductToCart(productId) {
        this.cart.push(productId)
        return this.cart;
    }

    
    removeProductFromCart(productId) {
        this.cart = this.cart.filter(id => id !== productId)
        return this.cart
    }

    
    getCart() {
        return this.cart
    }

    clearCart() {
        this.cart = []
        return this.cart
    }

}
 module.exports = { MemoryDatabase }