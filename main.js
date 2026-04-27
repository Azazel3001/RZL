const BASE_URL = window.location.origin;

let products = JSON.parse(localStorage.getItem("products")) || [];

function login() {
  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: userInput.value, password: passInput.value })
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) { alert(data.error); return; }
      localStorage.setItem("user", data.username);

      // animación entrada
      document.body.style.opacity = 0;
      setTimeout(() => location.reload(), 500);
    });
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// INVENTARIO
function addProduct() {
  const p = {
    name: name.value,
    price: price.value,
    stock: stock.value,
    img: img.value || "/default.png"
  };
  products.push(p);
  save();
  render();
}

function save() { localStorage.setItem("products", JSON.stringify(products)); }

function render() {
  const container = document.getElementById("products");
  if (!container) return;

  const searchTerm = document.getElementById("search")?.value.toLowerCase() || "";

  container.innerHTML = "";
  products.forEach((p, i) => {
    if (!p.name.toLowerCase().includes(searchTerm)) return;

    container.innerHTML += `
      <div class="card-product">
        <img src="${p.img}" onerror="this.src='/default.png'">
        <h4>${p.name}</h4>
        <p class="price">$${p.price}</p>
        <p class="${p.stock < 5 ? 'low' : ''}">Stock: ${p.stock}</p>
        <button class="delete" onclick="removeProduct(${i})">Eliminar</button>
      </div>`;
  });

  checkAlerts();
}

function removeProduct(i) {
  products.splice(i, 1);
  save();
  render();
}

// ALERTAS AUTOMÁTICAS
function checkAlerts() {
  const low = products.filter(p => p.stock < 5);
  const alertBox = document.getElementById("alerts");
  if (!alertBox) return;

  if (low.length === 0) alertBox.innerHTML = "✅ Todo en orden";
  else alertBox.innerHTML = low.map(p => `⚠ ${p.name} (Stock: ${p.stock})`).join("<br>");
}

// SOPORTE
function openSupport() { document.getElementById("supportModal").style.display = "flex"; }
function closeSupport() { document.getElementById("supportModal").style.display = "none"; }

// DEV MODE
function develop() { const system = new LZR(); system.build(); system.success(); }

// AUTOLOAD
function start() {
  login.style.display = "none";
  app.style.display = "block";
  render();
}

if (localStorage.getItem("user")) start();