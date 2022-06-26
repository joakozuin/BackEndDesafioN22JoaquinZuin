const router = require('express').Router()

const {
    getProductos,
    getProducto,
    postProducto,
    postFormProducto,
    putProducto,
    deleteProducto
}=require('../controlador/producto')

     /* console.log('Dentro Rutas de producto')
     console.log(__dirname) */


router.get('/',              getProductos)
router.get('/:id',           getProducto)
router.post('/',             postProducto)
router.post('/form',         postFormProducto)
router.put('/:id',           putProducto)
router.delete('/:id',        deleteProducto)
router.get('/',              getProductos)

module.exports=router