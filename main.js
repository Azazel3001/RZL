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
let editIndex = null;

// AGREGAR
function addProduct() {
  const p = {
    name: name.value,
    price: Number(price.value),
    stock: Number(stock.value),
    img: img.value || "https://via.placeholder.com/150"
  };

  if (!p.name || !p.price || !p.stock) {
    alert("Completa campos");
    return;
  }

  products.push(p);
  save();
  render();

  name.value = "";
  price.value = "";
  stock.value = "";
  img.value = "";
}

// GUARDAR
function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

// RENDER PRO
function render() {
  const container = document.getElementById("products");
  if (!container) return;

  const search = document.getElementById("search").value.toLowerCase();
  const sort = document.getElementById("sort").value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  if (sort === "price") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "stock") {
    filtered.sort((a, b) => a.stock - b.stock);
  }

  container.innerHTML = "";

  filtered.forEach((p, i) => {
    container.innerHTML += `
      <div class="card-product">
      <img src="${p.img}" onerror="this.src='/logo.png'">
        <h4>${p.name}</h4>
        <p class="price">$${p.price}</p>
        <p class="${p.stock < 5 ? 'low' : ''}">
          Stock: ${p.stock}
        </p>

        <div class="actions">
          <button class="edit" onclick="openEdit(${i})">Editar</button>
          <button class="delete" onclick="removeProduct(${i})">Eliminar</button>
        </div>
      </div>
    `;
  });

  document.getElementById("count").innerText =
    "Productos: " + filtered.length;
}

// ELIMINAR
function removeProduct(i) {
  products.splice(i, 1);
  save();
  render();
}

// MODAL EDITAR
function openEdit(i) {
  const p = products[i];
  editIndex = i;

  editName.value = p.name;
  editPrice.value = p.price;
  editStock.value = p.stock;
  editImg.value = p.img;

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// GUARDAR EDICIÓN
function saveEdit() {
  const p = products[editIndex];

  p.name = editName.value;
  p.price = Number(editPrice.value);
  p.stock = Number(editStock.value);
  p.img = editImg.value;

  save();
  render();
  closeModal();
}

// INIT
setTimeout(render, 300);

// cargar
setTimeout(render, 300);

// INICIO APP
function start() {
  const loginDiv = document.getElementById("login");
  const appDiv = document.getElementById("app");

  if (loginDiv) loginDiv.style.display = "none";
  if (appDiv) appDiv.style.display = "block";

  checkAlerts();
}

// AUTO LOGIN
if (localStorage.getItem("user")) {
  start();
} else {
  document.getElementById("app").style.display = "none";
}
function checkAlerts() {
  const low = products.filter(p => p.stock < 5);

  const alertBox = document.getElementById("alerts");
  if (!alertBox) return;

  if (low.length === 0) {
    alertBox.innerHTML = "✅ Todo en orden";
    return;
  }

  alertBox.innerHTML = low.map(p =>
    `⚠ ${p.name} (Stock: ${p.stock})`
  ).join("<br>");
}