let carrito = localStorage.carrito ? JSON.parse(localStorage.carrito): [];
const prodhtml = document.querySelector("#productoshtml");
const filtro1 = document.querySelector("#filtro1")
const filtro2 = document.querySelector("#filtro2")
var filtro3 = document.querySelector("#filtro3")
var cart = document.querySelector("#lista-carrito")

/////////////////////OBTENGO LOS DATOS DESDE JSON CON AJAX
var baseDeDatos = $.ajax({
  type: "GET",
  url: "js/db.json",
  data: "send",
  dataType: "json",
  success: function (resultado) {
    baseDeDatos = resultado
    crearCards(baseDeDatos);
    
  }
});

/////////////////////CREO LAS CARDS DE LOS PRODUCTOS
function crearCards(arr) {
    arr.forEach((producto) => {
      const card = document.createElement("div");
      card.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 color1 cerv");
      card.innerHTML = `<div class="card h-100">
      <img src=${producto.imagen} alt="${
        producto.nombre
      }" class="card-img-top">
      <div class="card-body">
      <h4 class="card-title">${producto.nombre}</h4>
      <h5 class="card-title pricing-card-title">$${producto.precio}</h5>

      <button class="list-group-item" id="agregarB" onclick="agregar(${baseDeDatos.indexOf(producto)})">Agregar al carrito</button>
      </div>
      </div>`;
  
      prodhtml.appendChild(card);
    });
  } 

/////////////////////AGREGO LA FUNCION PARA METER PRODUCTOS EN EL CARRITO
function agregar(index) {
  // debugger
  var producto = baseDeDatos[index]
  if (carrito.length > 0) {
      var sinProd = true
      console.log(sinProd)
      for (var m = 0; m < carrito.length; m++) {
          if (producto.nombre === carrito[m].nombre) {
              carrito[m].cantidad++
              sinProd = false
          }
      }
      if (sinProd) {
          producto.cantidad = 1
          carrito.push(producto)
      }
  } 
  else {
      producto.cantidad = 1
      carrito.push(producto)
  }
  cargarCarrito();
  localStorage.carrito = JSON.stringify(carrito);
}

/////////////////////AGREGO LA FUNCION PARA ELIMINAR
function eliminar(index) {
  // debugger
  carrito[index].cantidad = carrito[index].cantidad - 1;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  localStorage.carrito = JSON.stringify(carrito);
  cargarCarrito();
}

/////////////////////INGRESO LOS PRODUCTOS EN EL CARRITO HTML
function cargarCarrito() {
  // debugger
  cart.innerHTML = `<thead>
  <tr id="carro">
      <th>Imagen</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th></th>
  </tr>
</thead>`;
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      const trCarrito = document.createElement("tr");
      trCarrito.innerHTML = `<td>
            <img src="${producto.imagen}" width=100>
         </td>
         <td>${producto.nombre}</td>
         <td>$${producto.precio * producto.cantidad}</td>
         <td>${producto.cantidad}</td>        
         <td>
         <button style="float:left" onclick="eliminar(${carrito.indexOf(
           producto
         )})"><i class='fas fa-times-circle'></i></button>
         </td>`;
      cart.appendChild(trCarrito);
    });
  }
  localStorage.carrito = JSON.stringify(carrito);
}

/////////////////////FUNCION PARA VACIAR EL CARRITO
function vaciarCarrito() {
  Swal.fire({
    title: 'Seguro que desea vaciar su carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Hecho!',
        'Su carrito se ha vaciado.',
        'success',
        carrito = [],
        localStorage.carrito = JSON.stringify(carrito),
        cargarCarrito()
      )
    }
  })
}
cargarCarrito();


///////////////////ANIMACION DEL CARRITO
$(function(){
  $("#carrito1").click(function () {
    $( "#carrito" ).slideToggle();
  })
})
///////////////////DOY FUNCIONALIDAD A LA BARRA DE BUSQUEDA
function busqueda() { 
  let input = document.getElementById('barraB').value 
  input=input.toLowerCase(); 
  let x = document.getElementsByClassName('cerv'); 
    
  for (i = 0; i < x.length; i++) {  
      if (!x[i].innerHTML.toLowerCase().includes(input)) { 
          x[i].style.display="none"; 
      } 
      else { 
          x[i].style.display="list-item";                  
      } 
  } 
} 
///////////////////DOY FUNCIONALIDAD A LOS BOTONES DE FILTRADO
function filtrarR(){
  filtro1.innerHTML=""
  let filtrarRub = baseDeDatos.filter(element => element.tipo == "rubia" )
  console.log(filtrarRub)
  var th =document.getElementById("productoshtml")
  th = document.querySelector(".filtro1")
  th.classList.add("noMostrar")
  filtrarRub.forEach((producto) => {   
    const card = document.createElement("div");    
    card.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 color1 cerv");    
    card.innerHTML = `<div class="card h-100">
    <img src=${producto.imagen} alt="${
      producto.nombre
    }" class="card-img-top">
    <div class="card-body">
    <h4 class="card-title">${producto.nombre}</h4>
    <h5 class="card-title pricing-card-title">$${producto.precio}</h5>
    <button class="list-group-item" id="agregarB" onclick="agregar(${baseDeDatos.indexOf(producto)})">Agregar al carrito</button>
    </div>
    </div>`;
    filtro1.appendChild(card);
  });
}
rubia= document.getElementById("rubia")
rubia.addEventListener("click", filtrarR)

function filtrarN(){  
  filtro1.innerHTML=""
  let filtrarNeg = baseDeDatos.filter(element => element.tipo == "negra" )
  console.log(filtrarNeg)
  var th =document.getElementById("productoshtml")
  th = document.querySelector(".filtro2")
  th.classList.add("noMostrar")
  filtrarNeg.forEach((producto) => {       
    const card = document.createElement("div");    
    card.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 color1 cerv");    
    card.innerHTML = `<div class="card h-100">
    <img src=${producto.imagen} alt="${
      producto.nombre
    }" class="card-img-top">
    <div class="card-body">
    <h4 class="card-title">${producto.nombre}</h4>
    <h5 class="card-title pricing-card-title">$${producto.precio}</h5>
    <button class="list-group-item" id="agregarB" onclick="agregar(${baseDeDatos.indexOf(producto)})">Agregar al carrito</button>
    </div>
    </div>`;
    filtro1.appendChild(card);
  });
}
negra= document.getElementById("negra")
negra.addEventListener("click", filtrarN)

function filtrarA(){
  filtro1.innerHTML=""
  let filtrarArt = baseDeDatos.filter(element => element.tipo == "artesanal" )
  console.log(filtrarArt)
  var th =document.getElementById("productoshtml")
  th = document.querySelector(".filtro3")
  th.classList.add("noMostrar")
  filtrarArt.forEach((producto) => {    
    const card = document.createElement("div");
    card.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 color1 cerv");   
    card.innerHTML = `<div class="card h-100">
    <img src=${producto.imagen} alt="${
      producto.nombre
    }" class="card-img-top">
    <div class="card-body">
    <h4 class="card-title">${producto.nombre}</h4>
    <h5 class="card-title pricing-card-title">$${producto.precio}</h5>
    <button class="list-group-item" id="agregarB" onclick="agregar(${baseDeDatos.indexOf(producto)})">Agregar al carrito</button>
    </div>
    </div>`;
    filtro1.appendChild(card);
  });
}
artes= document.getElementById("artesanal")
artes.addEventListener("click", filtrarA)