class Producto {
    constructor(nombre, marca,precio, stock ) {

        this.nombre = nombre
        this.marca = marca
        this.precio =precio
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



botonProductos.addEventListener('click', () => {
    
    let productoStorage = JSON.parse(localStorage.getItem('Productos'))
    divProducto.innerHTML = ""
    productoStorage.forEach(producto => {

        divProducto.innerHTML += `<div class="card border-primary mb-3" style="max-width: 20rem;">
        <h4>${producto.nombre}</h4>
        <div class="card-body">
          <p class="card-text">${producto.marca}</p>
          <p class="card-text">${producto.precio}</p>
          <p class="card-text">${producto.stock}</p>
        </div>`

    });

})
botonProductos.addEventListener('click', () => {
fetch('productos.json')
.then(response=>response.json())

.then(productos=>{
    productos.forEach((productosJson) => {
        let {nombre,marca,precio,stock}=productosJson
        divProducto.innerHTML +=
        `<div class="card border-primary mb-3" style="max-width: 20rem;">
        <h4>${nombre}</h4>
        <div class="card-body">
          <p class="card-text">Marca: ${marca}</p>
          <p class="card-text">Precio: ${precio}</p>
          <p class="card-text">Stock: ${stock}</p>
        </div>`

        
    });

})
})


botonMarca.addEventListener('click',(e)=>{
    let productoStorage = JSON.parse(localStorage.getItem('Productos'))
    divMarca.innerHTML=""
    productoStorage.forEach(producto  => {
    let {nombre,marca,precio,stock}=producto

    divMarca.innerHTML +=`
    
    <ul>
        <li>    
            <h2>${marca}</h2>
        </li>
    </ul>`
console.log(e)


})
})

