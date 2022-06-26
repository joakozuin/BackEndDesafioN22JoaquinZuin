import mongoose from 'mongoose';
import config from '../config.js'

mongoose.connect(config.mongoDB.URL,config.mongoDB.options)

class MongoClase {
  constructor(nombreColecc, esqDoc) {

    this.coleccion=mongoose.model(nombreColecc,esqDoc)

  }

  async findAll(){
    try {
        const todos=await this.coleccion.find({})
        return todos
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async findById(id){
    try {
        const uno=await this.coleccion.find({_id:id})
        return uno
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async create(obj){
    try {
        const uno=await this.coleccion.create(obj)
        return uno
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editById(id,obj){
    try {
    
       const uno=await this.coleccion.updateOne({_id:id},{$set:obj})
       return uno

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editByIdCarPostProd(id,obj){  //edita un carrito e inserta productos al carrito
    try {
      
       const uno=await this.coleccion.updateOne({_id:id},{$push:{productos:obj}})

       return uno

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteById(id){
    try {
    
        const uno=await this.coleccion.deleteOne({_id:id})
        return uno
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteByIdCarIdProd(id,id_prod){ //edita un carrito y borra productos
    try {     

        const uno=await this.coleccion.updateOne({_id:id},{$pull:{productos:{_id:id_prod}}})
        return uno
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }  }

}



export default MongoClase