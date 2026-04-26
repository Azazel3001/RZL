const BASE_URL = window.location.origin;

// LOGIN
function login() {
  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("userInput").value,
      password: document.getElementById("passInput").value
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("user", data.username);

      document.body.style.opacity = 0;

      setTimeout(() => {
        location.reload();
      }, 400);
    });
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// INVENTARIO
let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const p = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    img: document.getElementById("img").value || "https://via.placeholder.com/150"
  };


  products.push(p);
  save();
  render();
}

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

function render() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  if (!p.name || !p.price || !p.stock) {
    alert("Completa todos los campos");
    return;
  }

  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="card-product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p class="price">$${p.price}</p>
        <p class="${p.stock < 5 ? 'low' : ''}">
          Stock: ${p.stock}
        </p>
        <button class="delete" onclick="removeProduct(${i})">
          Eliminar
        </button>
      </div>
    `;
  });
}

function removeProduct(i) {
  products.splice(i, 1);
  save();
  render();
}

// INICIO APP
function start() {
  const loginDiv = document.getElementById("login");
  const appDiv = document.getElementById("app");

  if (loginDiv) loginDiv.style.display = "none";
  if (appDiv) appDiv.style.display = "block";

  render();
}

// AUTO LOGIN
if (localStorage.getItem("user")) {
  start();
} else {
  document.getElementById("app").style.display = "none";
}