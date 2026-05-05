const BASE_URL = window.location.origin;
let currentUser = null;

function login() {
  const username = document.getElementById("userInput").value;
  const password = document.getElementById("passInput").value;

  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(r => r.json()).then(data => {
    if (data.error) { alert(data.error); return; }
    currentUser = data;
    localStorage.setItem("user", JSON.stringify(currentUser));
    window.location.href = "dashboard.html";
  });
}

// Obtener productos reales
async function fetchProducts() {
  const resp = await fetch(`${BASE_URL}/products?rol=${currentUser.rol}&username=${currentUser.username}`);
  const products = await resp.json();
  render(products);
}

// Render simple
function render(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="card ${p.areaActual ? 'in-progress' : 'pending'}">
        <h4>${p.nombre}</h4>
        <p>Tipo: ${p.tipo}</p>
        <p>Stock: ${p.stock}</p>
        <p>Cliente: ${p.cliente}</p>
        <div class="progress-bar"><div style="--width:${Math.floor(p.areas[0].procesadas / (p.areas[0].procesadas + p.areas[0].pendientes || 1) * 100)}%"></div></div>
      </div>
    `;
  });
}

// Al cargar dashboard
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  // Redirige al dashboard
  window.location.href = "dashboard.html";
});