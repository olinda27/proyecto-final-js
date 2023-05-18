//Crear productos.
const productos = JSON.parse(localStorage.getItem("productos")) || []

const mensaje = (mensaje) => {
    Toastify({
        text: mensaje,
        duration: 3000
        }).showToast();
}

const crearProducto = document.querySelector("#crearProducto")
crearProducto.addEventListener("submit", (e) => {
    e.preventDefault()
    let id = parseInt(localStorage.getItem("id")) || 1
    const datos = e.target.children
    const producto = {
        id,
        nombre:datos["nombre"].value,
        precio:datos["precio"].value,
        stock:datos["stock"].value
    }
    productos.push(producto)
    localStorage.setItem("productos", JSON.stringify(productos))
    crearProducto.reset()
    id++
    localStorage.setItem("id", id)
    mensaje("Se ha creado el producto " + producto.nombre + " correctamente.")
    console.log(productos)
    verProducto(producto)
})

//Borrar productos
const borrarProducto = (id) => {
    const borrarProductoId = document.querySelector("#btnBorrar" + id)
    borrarProductoId.addEventListener("click", () => {
        const index = productos.findIndex((producto) => producto.id == id)
        productos.splice(index, 1)
        console.log(productos)
        localStorage.setItem("productos", JSON.stringify(productos))
        const tarjetaProducto = document.querySelector("#producto" + id)
        tarjetaProducto.remove()
        mensaje("Se ha borrado el producto correctamente.")
    })
}

//Editar productos
const editarProducto = (id) => {
    const editarProductoId = document.querySelector("#editar" + id)
    editarProductoId.addEventListener("submit", (e) => {
        e.preventDefault()
        const datos = e.target.children
        const index = productos.findIndex((producto) => producto.id == id)
        productos[index].nombre = datos["nombre"].value
        productos[index].precio = datos["precio"].value
        productos[index].stock = datos["stock"].value
        localStorage.setItem("productos", JSON.stringify(productos))
        mensaje("Se ha actualizado el producto correctamente.")
    })
}

//Ver productos.
const verProducto = (producto) => {
    const tarjetaProducto = document.createElement("div")
    tarjetaProducto.className = "tarjeta"
    tarjetaProducto.id = "producto" + producto.id
    tarjetaProducto.innerHTML = `
                            <form class="formulario2" id="editar${producto.id}">
                                <input type="text" name="nombre" value ="${producto.nombre}">
                                <input type="number" name="precio" value ="${producto.precio}">
                                <input type="number" name="stock" value ="${producto.stock}">
                                <button>Editar</button>
                            </form>
                            <button id="btnBorrar${producto.id}">Borrar</button>
    `
    contenedorProductos.prepend(tarjetaProducto)            //El producto sale de primero.
    borrarProducto(producto.id)
    editarProducto(producto.id)
}

const contenedorProductos = document.querySelector("#contenedorProductos")
productos.forEach((producto) => {
    verProducto(producto)
})
