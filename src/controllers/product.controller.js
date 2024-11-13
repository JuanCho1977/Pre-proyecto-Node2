const { productService } = require ('../services/index.js')


class productController{

    constructor() {
        this.productService = productService        
    }

    getProducts     = async (req, res) => {
        try {
            console.log('llegue al get productos')
    
            const products =  await productService.getProducts()
                if (products.length === 0) {
                    return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
                    }
                    res.send({status:'succes', playload: products})
            
                       
        }catch (ERROR){
            
            console.log('Error:', ERROR);
                res.status(500).send({ status: 'error', message: 'Error al obtener el producto' })
        }
        
    }
    getProduct      = async (req, res) => {
        try {
            console.log('seleccion de producto por ID')
            const {id} = req.params
                const product =  await productService.getProduct(id)
                    if (!product) {
                        return res.status(404).send({ status: 'error', message: 'Producto no encontrado' });
                     }
            
                          res.send({status:'succes', playload: product})
                       
        }catch (ERROR){
            
            console.log('Error:', ERROR);
                res.status(500).send({ status: 'error', message: 'Error al obtener el producto' })
        }
    }
    createProduct   =  async (req, res) => {
        try {
            console.log("estoy en el post de produtos")
            const {title,code,price,thumbnail,category} = req.body
            if(!title || !code ||  !price || !category){
                return res(404).send({ status: 'error', message: 'debe completar los campos obligatorios' })
            }      const response = await productService.createProduct(req.body)
                        res.send({status: 'success', payload: response})
                        console.log("se a creado con exito la carga")
        } catch (ERROR) {
            console.log('Error:', ERROR);
                res.status(500).send({ status: 'error', message: 'Error al cargarr el producto' })
        }
    } 
    deleteProduct   = async (req,res) =>{
        try {
            console.log('Llegue al delete product')
    
            const { pid } = req.params
            if (!mongoose.Types.ObjectId.isValid(pid)) {
                return res.status(404).send({ status: 'error', message: 'ID de producto no válido' });
            }
                const producto = await productService.deleteProduct(pid)
                     if (producto.deletedCount === 0) {
                         return res.status(404).send({ status: 'error', message: 'Producto no Borrado' });
                         }    
                            res.send({status:'succes', playload: producto})               
                    }catch (ERROR){
        
                         console.log('Error:', ERROR);
                             res.status(500).send({ status: 'error', message: 'Error al borrar el producto' })
                        
        } 
    }
    updateProduct   = async (req, res) => {
        try{
            console.log('ingrese al PUT')
            const pid = req.params
            const body = req.body
                const producto = await productService.updateProduct(pid,body)
                if (producto.modifiedCount === 0 ) {
                    return res.status(404).send({ status: 'error', message: 'Producto no Modificado' });
                 }    
                      res.send({status:'succes', playload: producto})               
        }catch (ERROR){
        
             console.log('Error:', ERROR);
                res.status(500).send({ status: 'error', message: 'Error al obtener el producto' })
                        
        } 
    }


}

module.export = {
    productController
}