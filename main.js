//Crear productos. Trae los productos creados en editar-productos.js
const productos = JSON.parse(localStorage.getItem("productos")) || []

const verProducto = (producto) => {
    const tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "tarjeta"
    tarjetaProducto.innerHTML = `
                                <h3>${producto.nombre}</h3>
                                <p>Precio: ${producto.precio}</p>
                                <p>Stock: ${producto.stock}</p>
                                <button>Añadir a carrito</button>
    `
    contenedorProductos.prepend(tarjetaProducto)            //El producto sale de primero.
}

const contenedorProductos = document.querySelector("#contenedorProductos")
productos.forEach((producto) => {
    verProducto(producto)
})