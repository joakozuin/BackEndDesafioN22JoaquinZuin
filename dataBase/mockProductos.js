import faker from 'faker'
faker.locale='es'

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


function generadorProducto(){
    return{
          id:1,
          fecha:calcFechaHora(),
          nombre:"escuadra",
          descripcion:"Escuadra 90",
          codigo:2020,
          urlfoto:faker.internet.url(),
          precio:2020,
          stock:10

    }


}

export {generadorProducto}