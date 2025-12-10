const cartBurger = JSON.parse(localStorage.getItem("carBurger")) || [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const burgercardsContainer = document.getElementById("burgerCards");

    // contenido de las cards de las burgers
    data.forEach((burger) => {
      let burgerCard = document.createElement("div");
      burgerCard.classList.add("burger-card");
      burgerCard.innerHTML = `
     <img src ="${burger.img}" alt = "${burger.name}" /> 
    <h2> ${burger.name} </h2>
    <p> ${burger.description} </p> 
    <p> Price: $${burger.price.toFixed(3)} </p>  
    <button id= "comprar-${burger.id}"> Comprar </button> 
    `;
      // tofixed(3) para mostrar tres decimales en el precio
      burgercardsContainer.appendChild(burgerCard);

      const comprarButton = document.getElementById(`comprar-${burger.id}`);
      comprarButton.addEventListener("click", () => {
        cartBurger.push(`${burger.name} - $${burger.price.toFixed(3)}`);
        mostrarCarrito();
        localStorage.setItem("carBurger", JSON.stringify(cartBurger));
        Toastify({
          text: "Agregado al carrito",
          duration: 2000,
          gravity: "top",
          position: "right",
          style: { background: "green" },
        }).showToast();
      });
    });
  })

  .catch((error) => console.error("Error al cargar data.json:", error));

function mostrarCarrito() {
  const contendorCarrito = document.getElementById("CartBurger-container");
  contendorCarrito.innerHTML = `
  <h2> Carrito de compras </h2>
`;
  cartBurger.forEach((item, index) => {
    contendorCarrito.innerHTML += `
    <div class="cart-item">
    <p> ${index + 1} - ${item} </p>
  <button class="eliminar-item" data-index="${index}">Eliminar</button>
    </div> 
`;
  });

  const totalItems = cartBurger.length;
  const totalprice = cartBurger.reduce((total, item) => {
    const price = parseFloat(item.split("$")[1]);
    return total + price;
  }, 0);

  contendorCarrito.innerHTML += `
<p> total items : ${totalItems} </p> 
<p> precio total : $${totalprice.toFixed(3)} </p>
 <button id="vaciar-carrito"> Vaciar Carrito </button> 
 <button id="finalizar-compra"> Pagar </button> 
`;

  // boton eleminar item
  const eliminarButtons = contendorCarrito.querySelectorAll(".eliminar-item");
  eliminarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cartBurger.splice(index, 1);
      mostrarCarrito();
      localStorage.setItem("carBurger", JSON.stringify(cartBurger));
      Toastify({
        text: "eliminado",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "red" },
      }).showToast();
    });
  });

  // boton vaciar
  const vaciarCarritoButton = document.getElementById("vaciar-carrito");
  vaciarCarritoButton.addEventListener("click", () => {
    cartBurger.length = 0;
    mostrarCarrito();
    localStorage.removeItem("carBurger");
    Toastify({
      text: "carrito vaciado",
      duration: 2000,
      gravity: "bottom",
      position: "right",
      style: { background: "orange" },
    }).showToast();
  });

  //boton pagar
  const pagarButton = document.getElementById("finalizar-compra");
  pagarButton.addEventListener("click", () => {
    cartBurger.length = 0;
    Swal.fire({
      title: "¿Confirmar compra?",
      text: "¿Estás seguro de que querés finalizar el pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Pago realizado!",
          text: "Gracias por tu compra.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        cartBurger.length = 0;
        mostrarCarrito();
        localStorage.removeItem("carBurger");
      }
    });
  });
}
