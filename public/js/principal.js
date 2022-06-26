//const socket=io()

const mensajesDiv=document.querySelector("#mensajes")
const botonEnv=document.querySelector("#enviarMens")

const prodDiv=document.querySelector("#rend")
const botonEnvProd=document.querySelector("#enviarProd")

socket.on('mensaje',(mensajes)=>{

  //console.log('Cliente recibe mensaje'+mensajes)

   mensajesDiv.innerHTML=mensajes.map(mensaje=>{
      return(
             `<div class="mui-row">
                <div class="mui-col-md-4">
                  <strong style="color:blue">${mensaje.email}</strong>
                </div>
                <div class="mui-col-md-3">
                  <p style="color:brown" >[${mensaje.fecha}]:</p>
                </div>
                <div class="mui-col-md-5 "mui--text-left"">
                  <p style="color:green; font-style:italic">${mensaje.texto}</p>
                </div>
             </div>`
           )

   }).join(" ")

})

botonEnv.addEventListener('click',(e)=>{
  //e.preventDefault()
  const inputEmail=document.querySelector("#email").value
  const inputTexto=document.querySelector('#texto').value
  
  const mensaje={
      email:inputEmail,
      texto:inputTexto
  }
   //console.log('Cliente envia mensaje'+mensaje)

   socket.emit('nuevoMensaje',mensaje)


})



//websocket manejo Producto  del lado del cliente
//
botonEnvProd.addEventListener("click", (e) => {
  //e.preventDefault()
  const inputTitulo = document.querySelector("#titulo").value;
  const inputPrecio = document.querySelector("#precio").value;
  const inputThumbnail = document.querySelector("#thumbnail").value;

  const producto = {
    titulo: inputTitulo,
    precio: inputPrecio,
    thumbnail: inputThumbnail,
  };

  /* console.log('Cliente enviando Producto')
  console.log(producto) */


  socket.emit("nuevoProducto", producto);

  //Petición Post HTTP envia producto a la ruta
  //en formato JSON
  fetch("http://localhost:8080/api/productos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      console.log("Todo bien:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}); 


socket.on('producto',(productos)=>{
  console.log("Cliente recibiendo Producto del servidor");

  /* productos.map(producto=>{

      console.log(producto.titulo);
      console.log(producto.precio);

    })  */

  // Petición HTTP Renderiza lado Servidor

  /*  fetch("http://localhost:8080/api/productos/motorEjs")
      .then((response) => response.text())
       .then(data=>{
              const renderizar=document.getElementById("rend")
              renderizar.innerHTML=data
              console.log(data)
     })   */


  //Renderiza del lado del cliente usando un div
  //
  /* prodDiv.innerHTML=productos.map(producto=>{
      return(
             `<div class="mui-row">
                <div class="mui-col-md-3">
                  <strong style="color:blue">${producto.titulo}</strong>
                </div>
                <div class="mui-col-md-3">
                  <p style="color:brown" >[${producto.precio}]:</p>
                </div>
                <div class="mui-col-md-5 "mui--text-left"">
                  <p style="color:green; font-style:italic">${producto.thumbnail}</p>
                </div>
             </div>`
           )

   }).join(" ") */

  //Renderiza del lado del cliente usando HandleBard
  //
   let product = () => productos;
   let prodHay=false

   if (product().length != 0) {
     prodHay = true;
   }

   productoClie = {
     titulo: "Renderizado de Productos Usando Motor Handlebars",
     prod: product(),
     prodHay,
   };

   let template = document.getElementById("handlebTabla").innerHTML;
   let compile = Handlebars.compile(template);

   let compiledHTML = compile(productoClie);

   document.getElementById('rend').innerHTML=compiledHTML

})