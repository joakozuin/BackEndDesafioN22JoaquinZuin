import MongoClass from '../../modelo/MongoClass.js'

export class MongoDBProductos extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('productos',{
        fecha: {type:String, required:true},
        nombre:{type:String,required:true},
        descripcion:{type:String,required:true},
        codigo:{type:Number,required:true},
        urlFoto:{type:String,required:true},
        precio:{type:Number,required:true},
        stock:{type:Number,Default:0}
      })
  }

}