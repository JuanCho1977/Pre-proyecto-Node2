const { cartService } = require("../services/index.js");

class cartController{
    constructor () {
        this.cartService = cartService

    }
    
    getcarts   = async (req, res) => {
        try {
            const carts = await cartService.getcarts();
                if (!carts || carts.length === 0) {
                    return res.status(404).send({ status: 'error', message: 'No se encontraron carritos' });
                }
    
                res.send({ status: 'success', payload: carts });
        } catch (ERROR) {
            console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener los carritos' });
        }
    }
    getcart    = async (req, res) => {
        try {
            console.log("ingrese al GET de Carrito x id")
            const { id } = req.params;
            const cart = await cartService.getcart(id);
                if (!cart) {
                    return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
                }
    
                res.send({ status: 'success', payload: cart });
        } catch (ERROR) {
            console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al obtener el carrito' });
        }
    }
    createcart = async (req, res) => {
        try {
            console.log("ingrese al POST de Carrito")
            const { title } = req.body;
                if (!title) {
                    return res.status(400).send({ status: 'error', message: 'Debe completar los campos obligatorios' });
                }
    
                const resCart = await cartService.createcart(req.body);
                res.send({ status: 'success', payload: resCart });
        } catch (ERROR) {
            console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al crear el carrito' });
        }
    }
    deletecart = async (req, res) => {
        try {
            const { id } = req.params;
            const response = await cartService.deletecart(id);
                console.log("estoy en el delete de carrito")
                if (response.deletedCount === 0) {
                    return res.status(404).send({ status: 'error', message: 'Carrito no borrado' });
                }
            
                res.send({ status: 'success', payload: response });
        } catch (ERROR) {
            console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al borrar el carrito' });
        }
    }
    updatecart =  async (req, res) => {
        try {
            console.log("Estoy en PUT de carrito")
            const { id } = req.params;
            const body = req.body;
            const response = await cartService.updatecart(id, body);
    
                if (response.modifiedCount === 0) {
                    return res.status(404).send({ status: 'error', message: 'Carrito no modificado' });
                }
    
                res.send({ status: 'success', payload: response });
        } catch (ERROR) {
            console.log('Error:', ERROR);
            res.status(500).send({ status: 'error', message: 'Error al actualizar el carrito' });
        }
    }
}


module.exports = {cartController};


