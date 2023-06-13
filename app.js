let platos = [
    {
        id: 1,
        nombre: "Canelones de carne",
        precio: 940,
        imagen: "./images/canelonesdecarne.jpg",
        disponible: true
    },
    {
        id: 2,
        nombre: "Canelones de choclo",
        precio: 940,
        imagen: "./images/canelonesdejychoclo.jpg",
        disponible: true
    },
    {
        id: 3,
        nombre: "Cerdo Agridulce",
        precio: 1080,
        imagen: "./images/cerdoagridulce.jpg",
        disponible: true
    },
    {
        id: 4,
        nombre: "Lasagnas de carne",
        precio: 1100,
        imagen: "./images/lasagnacarne.jpg",
        disponible: true
    },
    {
        id: 5,
        nombre: "Lasagnas de pollo",
        precio: 1100,
        imagen: "./images/lasagnapollo.jpg",
        disponible: true
    },
    {
        id: 6,
        nombre: "Lasagnas de vegetales",
        precio: 1100,
        imagen: "./images/lasagnavegetales.jpg",
        disponible: true
    },
    {
        id: 7,
        nombre: "Pollo a la crema",
        precio: 1260,
        imagen: "./images/polloalacrema.jpg",
        disponible: true
    },
    {
        id: 8,
        nombre: "Pollo al curry",
        precio: 1230,
        imagen: "./images/polloalcurry.jpg",
        disponible: true
    },
    {
        id: 9,
        nombre: "Pollo Chino",
        precio: 1230,
        imagen: "./images/pollochino.jpg",
        disponible: true
    }
]
const platosStr = JSON.stringify(platos)

const container = document.getElementById(contenedorCards);
contenedorCards.innerHTML = "";
platos.forEach((plato, indice)=>{
    let card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3", "col-md-4", "col-6", "mb-1", "mt-1");
    let html = `
    <img src="${plato.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${plato.nombre}</h5>
      <p class="card-text">${plato.precio}</p>
      <a href="#cart" class="btn btn-danger" onClick="agregarAlCarrito(${indice})">Comprar</a>
    </div>
      `;
  card.innerHTML = html;
  contenedorCards.appendChild(card);
})

const carrito = []
carritoTraidoJSON = localStorage.getItem("carritoLS")
carrito.push(...((JSON.parse(carritoTraidoJSON))))
console.log(carrito)

function crearCarrito(){
    const listaVacia = document.querySelector(".carritoVacio")
    listaVacia.innerHTML = ""
    carrito.forEach((plato,indice)=>{
        let filaCarrito = document.createElement("tr");
    filaCarrito.classList.add("w-100")
    filaCarrito.innerHTML = `
    <td scope="row" class="filaCarrito">${plato.nombre}</td>
    <td class="filaCarrito">Precio: ${plato.precio}</td>
    <td class="filaCarrito">Cantidad: ${plato.cantidad}</td>
    <td class="filaCarrito">Subtotal: $ ${plato.precio * plato.cantidad}</td>
    <td class="filaCarrito">
        <button type="button" class="btn btn-dark">Eliminar</button>
    </td>
    `;
    listaVacia.appendChild(filaCarrito)
    })
    const totalCarro = document.querySelector(".totalCompra")
    totalCarro.innerHTML = ""
    let contenedorTotal = document.createElement("div")
    contenedorTotal.classList.add("text-center")
    let total = 0
    carrito.forEach((plato, indice)=>{
        let subtotal = plato.precio * plato.cantidad
        total = total + subtotal
    })
    contenedorTotal.innerHTML = `Total carrito: $ ${total}`
    totalCarro.appendChild(contenedorTotal)
    const finalizar = document.querySelector(".botonFinalizar")
    let botonFinalizar = document.createElement("div")
    botonFinalizar.innerHTML = `
    <button type="button" class="btn btn-dark">Finalizar Compra</button>
    `;
    contenedorTotal.appendChild(botonFinalizar)

}

crearCarrito()

function agregarAlCarrito(indice){
    const productoClickeado = platos[indice]
    const flor = carrito.findIndex((elemento)=>{
        return elemento.id === platos[indice].id
    } )
    if (flor === -1){
        const platoAgregado = platos[indice]
        platoAgregado.cantidad=1
        carrito.push(platoAgregado)
        console.log(carrito)
        crearCarrito()
    }
    else {
        carrito[flor].cantidad +=1;
        crearCarrito()
    }
    const carritoActualizado = JSON.stringify(carrito)
    localStorage.setItem("carritoLS", carritoActualizado)  
}





