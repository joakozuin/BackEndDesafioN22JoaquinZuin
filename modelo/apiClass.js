

const knex=require('knex')


class Api {

    constructor(options,tabla) {
        //this.rutaBD=__dirname+rutaBD
        //this.rutaBD=(process.cwd() +rutaBD)
        //console.log(`Ruta base datos Api: ${this.rutaBD}`)
        this.opciones=options
        this.knex=knex(options)
        this.tabla=tabla
    }

    //Crea la tabla Producto y si existe la sobre escribe
    //
    async createTableProd(){
      try{

        await this.knex.schema.dropTableIfExists(this.tabla)
        await this.knex.schema.createTable(this.tabla,table=>{
                table.increments('id').primary().unique()
                table.varchar('titulo',20).notNullable()
                table.float('precio')
                table.varchar('thumbnail')
        })
      }catch(error){
          throw new Error(`Error creando la tabla en la  BD:${error}`)
      }
   }

    //Crea la tabla Mensaje y si existe la sobre escribe
    //
    async createTableMensaje(){
      try{
        await  this.knex.schema.dropTableIfExists(this.tabla)
        await  this.knex.schema.createTable(this.tabla,table=>{
                table.increments('id').primary().unique()
                table.varchar('email',30).notNullable()
                table.varchar('texto',50).notNullable()
                table.varchar('fecha',50).notNullable()
        })
      }catch(error){
          throw new Error(`Error creando la tabla mensajes en la  BD:${error}`)
      }
   }

    //Busca todos los objetos en la BD
    //
    async findAll(){
        try{
          const registros= await this.knex.from(this.tabla).select('*')
          return registros
        }catch(error){
            throw new Error(`Error leyendo toda la BD:${error}`)
        }
    }

    //Busca un obj por id en la BD
    //
     async findById(id){
       try{
          const registro= await  this.knex.from(this.tabla).where('id',id)
          /* let resultad={}

          const result=registro.find(e=>e.id===Number(id))

          if(result){         
            resultad={
                resultado:result,
                idError:true
                    }
           }else{
            resultad={
                resultado:result,
                idError:false
              }
          } */
                                                  
          return registro

       }catch(error){
         throw new Error(`Error leyendo un registro de la BD:${error}`)
       }
     }
     
     //Crea un objeto en la BD
     //
     async create(obj){
       try{

         let nuevoRegistro=await this.knex.from(this.tabla).insert(obj,'id')
                 
         return nuevoRegistro

       }catch(error){
          throw new Error(`Error al guardar un registro en la BD:${error}`)
       }

     }

      async editById(id,obj){
        try{

         let regModificado= await this.knex.from(this.tabla).where('id',id).update(obj)
         return regModificado

        }catch(error){
            throw new Error(`Error al modificar un registro en la BD:${error}`)
        }

      }

      
      async deleteById(id){
        try{

         const regBorrado= await  this.knex.from(this.tabla).where('id',id).del()
         return regBorrado
          

        }catch(error){
            throw new Error(`Error al borrar un registro en la BD:${error}`)
        }
      }

      async deleteAll(){
        try{
         return await  this.kne.from(this.tabla).del()
           
        }catch(error){
            throw new Error(`Error al borrar un registro en la BD:${error}`)
        }
      }
}

module.exports=Api