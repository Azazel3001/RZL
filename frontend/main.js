const BASE_URL = window.location.origin;
let currentUser = null;

function login() {
  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInput.value,
      password: passInput.value
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) return alert(data.error);
      currentUser = data;
      start();
    });
}

function start() {
  login.style.display = "none";
  app.style.display = "block";
  loadProducts();
}

function loadProducts() {
  fetch(`${BASE_URL}/products?rol=${currentUser.rol}&username=${currentUser.username}`)
    .then(r => r.json())
    .then(render);
}

function addProduct() {
  const p = {
    nombre: name.value,
    tipo: type.value,
    stock: stock.value,
    cliente: client.value,
    areaActual: { nombre: "Corte", responsable: "juan" },
    areas: [
      { nombre: "Corte", procesadas: 0, pendientes: 10, responsable: "juan" }
    ]
  };

  fetch(BASE_URL + "/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p)
  }).then(loadProducts);
}

function removeProduct(id) {
  fetch(BASE_URL + "/products/" + id, {
    method: "DELETE"
  }).then(loadProducts);
}

function render(products) {
  productsDiv.innerHTML = "";

  products.forEach(p => {
    productsDiv.innerHTML += `
      <div>
        <h3>${p.nombre}</h3>
        <p>${p.tipo}</p>
        <p>Stock: ${p.stock}</p>
        ${currentUser.rol !== "cliente" ? `<button onclick="removeProduct('${p._id}')">Eliminar</button>` : ""}
      </div>
    `;
  });
}