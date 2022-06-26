const router = require('express').Router()

const {
    getProductosTest
}=require('../controlador/producto')

     /* console.log('Dentro Rutas de producto')
     console.log(__dirname) */


router.get('/',              getProductosTest)


module.exports=router