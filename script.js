class Producto {
    constructor(nombre, marca, precio, stock) {
        
        this.nombre = nombre
        this.marca = marca
        this.precio = precio
        this.stock = stock
        

    }
}

let productos = []



if (localStorage.getItem('Productos')) {
    productos = JSON.parse(localStorage.getItem('Productos'))
} else {
    localStorage.setItem('Productos', JSON.stringify(productos))

}
let buscador = document.getElementById('buscador')
let formulario = document.getElementById('formulario')
let divProducto = document.getElementById('listProductos')
let botonProductos = document.getElementById('btnLista')
let botonMarca = document.getElementById('btnMarca')
let divMarca = document.getElementById('listMarca')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let datForm = new FormData(e.target)
    const producto = new Producto(datForm.get('nombre'), datForm.get('marca'), datForm.get('precio'), datForm.get('stock'))
    if (datForm.get('nombre') != "" && datForm.get('marca') != "" && datForm.get('precio') != "" && datForm.get('stock')) {

        console.log(producto)
        productos.push(producto)
        console.log(productos)
        localStorage.setItem('Productos', JSON.stringify(productos))
        
        formulario.reset()
        Toastify({

            text: "Producto agregado",

            duration: 3000

        }).showToast();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Formulario incompleto',
            footer: 'Completar el formulario de manera completa por favor'
        })
    }

})



let productoTotales =[]

botonProductos.addEventListener('click', () => {

    
    fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        let productoStorage = JSON.parse(localStorage.getItem('Productos'))
         productoTotales = productoStorage.concat(productos)
        console.log(productoTotales);
        divProducto.innerHTML = ""
        productoTotales.forEach((producto,indice)=>{
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
