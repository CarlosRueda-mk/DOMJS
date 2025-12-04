const burgerMenu = [
  {
    id: 1,
    name: "Burger Simple",
    price: 12.0,
    description:
      "Burger sencilla con queso, lechuga, tomate,cebolla,pepinillos y salsa especial",
    img: "./imagenes/sencilla.jpg",
  },
  {
    id: 2,
    name: "Burger Completa",
    price: 14.5,
    description:
      "Burger completa con queso, lechuga, tomate, cebolla, pepinillos,huevo,salsa especial y tocino",
    img: "./imagenes/completa.jpg",
  },
  {
    id: 3,
    name: "Burger Doble",
    price: 13.8,
    description:
      " Burger doble con doble carne,queso,lechuga, tomate,cebolla,pepinillos y salsa especial",
    img: "./imagenes/doble.jpg",
  },
  {
    id: 4,
    name: "CheeseBurger",
    description: "Burger con extra queso,Lechuga,tomate y salsa especial",
    price: 15.0,
    img: "./imagenes/chesee.jpg",
  },
  {
    id: 5,
    name: "Vegan Burger",
    description:
      " Burger vegana con hamburguesa de lenteja y soja, lechuga, tomate, cebolla y salsa especial vegana",
    price: 16.2,
    img: "./imagenes/vegan.jpg",
  },
  {
    id: 6,
    name: "Sin tacc Burger",
    description:
      " Burger sin tacc con pan sin tacc, carne, queso, lechuga, tomate, cebolla y salsa especial",
    price: 17.5,
    img: "./imagenes/sintacc.jpg",
  },
  {
    id: 7,
    name: "Papas Fritas",
    description: "Porcion de papas fritas crocantes",
    price: 5.0,
    img: "./imagenes/papas01.jpg",
  },
  {
    id: 8,
    name: "nuggets de pollo",
    description: "Porcion de nuggets de pollo crocantes",
    price: 6.0,
    img: "./imagenes/nuggets01.jpg",
  },
];
// capaz agregue unos nachos idk

const cartBurger = JSON.parse(localStorage.getItem("carBurger")) || [];

const burgercardsContainer = document.getElementById("burgerCards");

// contenido de las cards de las burgers
burgerMenu.forEach((burger) => {
  let burgerCard = document.createElement("div");
  burgerCard.classList.add("burger-card");
  burgerCard.innerHTML = `
     <img src ="${burger.img}" alt = "${burger.name}" /> 
    <h2> ${burger.name} </h2>
    <p> ${burger.description} </p> 
    <p> Price: $${burger.price.toFixed(3)} </p>  
    <button id= "comprar-${burger.id}"> Comprar </button>  `;
  // tofixed(3) para mostrar tres decimales en el precio
  burgercardsContainer.appendChild(burgerCard);

  const comprarButton = document.getElementById(`comprar-${burger.id}`);
  comprarButton.addEventListener("click", () => {
    // alert(
    //   `has agregado al carrito la ${burger.name} por $${burger.price.toFixed(
    //     3
    //   )}`
    // );
    // only for testing :v
    cartBurger.push(`${burger.name} - $${burger.price.toFixed(3)}`);
    mostrarCarrito();
    localStorage.setItem("carBurger", JSON.stringify(cartBurger));
    console.log(cartBurger);
  });
});

function mostrarCarrito() {
  const contendorCarrito = document.getElementById("CartBurger-container");
  contendorCarrito.innerHTML = `
  <h2> Carrito de compras </h2>
`;
  cartBurger.forEach((item, index) => {
    contendorCarrito.innerHTML += `
    <p> ${index + 1} - ${item} </p>
`;
  });

  const totalItems = cartBurger.length;
  const totalprice = cartBurger.reduce((total, item) => {
    const price = parseFloat(item.split("$")[1]);
    return total + price;
  }, 0);

  contendorCarrito.innerHTML += `
<p> total items : ${totalItems} </p>
<button id="eliminar-item"> eliminar item</button> 
<p> precio total : $${totalprice.toFixed(3)} </p>
 <button id="vaciar-carrito"> Vaciar Carrito </button> 
 <button id="finalizar-compra"> Pagar </button> 
`;

  // boton eleminar item
  const eliminarItemButton = document.getElementById("eliminar-item");
  eliminarItemButton.addEventListener("click", () => {
    cartBurger.pop();
    mostrarCarrito();
    localStorage.setItem("carBurger", JSON.stringify(cartBurger));
  });

  // boton vaciar
  const vaciarCarritoButton = document.getElementById("vaciar-carrito");
  vaciarCarritoButton.addEventListener("click", () => {
    cartBurger.length = 0;
    mostrarCarrito();
    localStorage.removeItem("carBurger");
  });

  //boton pagar
  const pagarButton = document.getElementById("finalizar-compra");
  pagarButton.addEventListener("click", () => {
    alert(); // agregar notify
  });
}
