
const {options}=require ('../dataBase/configDB')
const Api=require('../modelo/apiClass');

const api=new Api(options.mariaDB,'productos');

//Creando la tabla productos en la BD
//-----------------------------------
api.createTableProd()


calcFechaHora=()=>{
  const dato = new Date();
  const dia = dato.getDate();
  const mes = dato.getMonth() + 1;
  const ano = dato.getFullYear();
  const hor = dato.getHours();
  const min = dato.getMinutes();
  const seg = dato.getSeconds();
  const fecha = [dia, mes, ano].join("/").toString();
  const hora = [hor, min, seg].join(":").toString();
  return [fecha, hora].join(" ");
}

module.exports = {
  //Envia todos los productos
  //
  getProductosTest: async (req, res) => {

    //let productos= await api.findAll()

    res.json({
      mensage: "Lista de Productos de la BD",
      productos
    });
  },
  //Envia todos los productos
  //
   getProductos: async (req, res) => {

    let productos= await api.findAll()

    res.json({
      mensage: "Lista de Productos de la BD",
      productos
    });
  },

  //Envia un producto por id
  //
  getProducto: async (req, res, next) => {
    const { id } = req.params;
   
    let producto= await api.findById(id)

    if (producto.length===0) {
      const error = new Error(`(get)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error);  
    }
    
    res.json({
      mensage: `Producto con id:${id}`,
      producto
    });
  },

  //Agrega un producto
  //
  postProducto: async (req, res) => {
    const { titulo, precio, thumbnail} = req.body;

    let producto = {
      titulo,
      precio:Number(precio),
      thumbnail
    };
    
    let registro=await api.create(producto)
    let id=registro

    res.json({
      mensage: `Se agregó el producto con id:${id}`,
      producto,
    });
  },

  //Agrega un producto desde un formulario
  //
  postFormProducto: async (req, res) => {
    const { titulo, precio, thumbnail} = req.body;

    let producto = {
      titulo,
      precio:Number(precio),
      thumbnail
    };
    
    let registro=await api.create(producto)
    let id=registro.id

   /* res.json({
      mensage: `Se agregó el producto con id:${ultId} desde un formulario`,
      producto,
    }); */

    res.redirect('/');
  },

  //Modifica un producto
  //
  putProducto: async (req, res,next) => {
    const { id } = req.params;
    const { titulo, precio, thumbnail} = req.body;

    let producto = {
      titulo,
      precio:Number(precio),
      thumbnail
    };

    let registro= await api.editById(id,producto)
    
    if (registro===0) {
      const error = new Error(`(put)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se modificó el producto con id:${id}`,
      producto
    });



  },

  //Borrar un producto
  //
  deleteProducto: async(req, res,next) => {
    const { id } = req.params;

    let producto=await api.findById(id)
    
    let reg= await api.deleteById(id)

    if (reg===0) {
      const error = new Error(`(delete)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se borró el producto con id:${id}`,
      producto
    });
  },

   


};