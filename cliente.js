let buscador = document.getElementById('buscador')
let divProducto = document.getElementById('listProductos')
let botonProductos = document.getElementById('btnLista')
let btnCarrito = document.getElementById('btnCarrito')
let carritoSidebar = document.getElementById('productoAgregado')




btnCarrito.addEventListener('click', (e) => {
  productoAgregado.classList.toggle("active")
})

let productoTotales = []

botonProductos.addEventListener('click', () => {


  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      let productoStorage = JSON.parse(localStorage.getItem('Productos'))
      productoTotales = productoStorage.concat(productos)
      console.log(productoTotales);
      divProducto.innerHTML = ""
      productoTotales.forEach((producto, indice) => {
        divProducto.innerHTML += `<div class="card border-dark mb-3" style="max-width: 20rem;">
                                               
            <div class="card-header"><h4>${producto.nombre}</h4></div>
            <img src="${producto.imagen ? producto.imagen : './imagenes/img.png'}" class="img-fluid" alt="...">                  
            <div class="card-body">
                <h4 class="card-title">Marca: ${producto.marca}</h4>
                <p class="card-text">Precio: ${producto.precio}</p>
                <p class="card-text">Stock: ${producto.stock}</p>                
                <button onClick="agregarProducto(${indice})" class="cssbuttons-io">
                <span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor"></path></svg> Agregar + </span>
                </button>
    
             </div>
        </div>`

      })
    })


})

let carrito = []

if (localStorage.getItem('Carrito')) {
  productos = JSON.parse(localStorage.getItem('Carrito'))
} else {
  localStorage.setItem('Carrito', JSON.stringify(carrito))

}

function agregarProducto(indice) {
  let productosFilter = productoTotales.filter((element, index) => {

    return index == indice
  });
  console.log(productosFilter);


  carrito.push(productosFilter)
  Toastify({

    text: "Producto agregado a carrito",

    duration: 3000

  }).showToast();
  localStorage.setItem('Carrito', JSON.stringify(carrito))

}


btnCarrito.addEventListener('click', () => {
  productoAgregado.innerHTML = ""
  let carritoStorage = JSON.parse(localStorage.getItem('Carrito'))
  carritoStorage.forEach((arrayCarrito) => {
    
    arrayCarrito.forEach((productosCarrito, pEliminar) => {
      let {
        nombre,
        marca,
        precio,
        stock
      } = productosCarrito
      
      Swal.fire({
        title:productoAgregado.innerHTML +=  `
                <div class="productosCarrito">
                <ul>
                    <li>Nombre: ${nombre}</li>
                    <li>Marca: ${marca}</li>
                    <li>Precio:$ ${precio}</li>
                    
              </ul>
                </div>
                `,

        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `Vaciar Carrito`,

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Compra Exitosa', '', 'success')
          localStorage.setItem('Carrito', JSON.stringify(""))
          productoAgregado.innerHTML = ""
        } else if (result.isDenied) {
          Swal.fire('Seguro que desea vaciar carrito', '', 'info')
          localStorage.setItem('Carrito', JSON.stringify(""))
          productoAgregado.innerHTML = ""
        }
      })

    })
  })
})

