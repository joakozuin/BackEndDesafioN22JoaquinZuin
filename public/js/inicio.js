
const socket=io()
function llamarRuta() {
  console.log("Llamando a la ruta de carga de la pagina dinámica...");

  // Petición HTTP
  fetch("http://localhost:8080/api/productos")
    .then((response) => response.text())
    .then((data) => {
      const productos=JSON.parse(data)
      console.log(productos.productos)

      productos.productos.map(prod=>{
        socket.emit("nuevoProductoI", prod)
      }) 


      //Renderiza del lado del cliente usando HandleBard
      //
      let product = () => productos.productos;
      let prodHay = false;

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

      document.getElementById("rend").innerHTML = compiledHTML;
    });
}
llamarRuta()