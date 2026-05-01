const BASE_URL = window.location.origin;
let currentUser = null;
let timerInterval = null;

// LOGIN
async function login() {
  const username = document.getElementById("userInput").value;
  const password = document.getElementById("passInput").value;

  try {
    const res = await fetch(BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.error) { alert(data.error); return; }
    currentUser = data;
    start();
  } catch (err) {
    console.error("Error login:", err);
    alert("Error conectando con el servidor");
  }
}

// LOGOUT
function logout() {
  currentUser = null;
  clearInterval(timerInterval);
  location.reload();
}

// INICIAR APP
function start() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("roleTag").innerText = currentUser.rol;
  loadProducts();

  if (currentUser.rol === "cliente" && currentUser.tiempoMaximo) {
    startTimer(currentUser.tiempoMaximo);
  }
}

// TIMER CLIENTE
function startTimer(minutes) {
  let timeLeft = minutes * 60;
  const timerEl = document.getElementById("timer");
  timerInterval = setInterval(() => {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    timerEl.innerText = `Tiempo restante: ${m}:${s < 10 ? '0' + s : s}`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alert("Tu sesión ha expirado");
      logout();
    }
  }, 1000);
}

// CARGAR PRODUCTOS
async function loadProducts() {
  try {
    const res = await fetch(BASE_URL + "/products");
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("Error cargando productos:", err);
  }
}

// AGREGAR PRODUCTO
async function addProduct() {
  const p = {
    nombre: document.getElementById("name").value,
    tipo: document.getElementById("type").value,
    stock: Number(document.getElementById("stock").value),
    imagen: document.getElementById("img").value || "/logo.png",
    cliente: document.getElementById("client").value,
    areaActual: { nombre: "Corte", responsable: "Juan" },
    areas: [
      { nombre: "Corte", procesadas: 0, pendientes: 0, responsable: "Juan", especificaciones: {} },
      { nombre: "Confección", procesadas: 0, pendientes: 0, responsable: "Maria", especificaciones: {} },
      { nombre: "Bordado/Impresión", procesadas: 0, pendientes: 0, responsable: "Luis", especificaciones: {} },
      { nombre: "Control de Calidad", procesadas: 0, pendientes: 0, responsable: "Ana", especificaciones: {} },
      { nombre: "Almacén", procesadas: 0, pendientes: 0, responsable: "Carlos", especificaciones: {} }
    ]
  };

  try {
    await fetch(BASE_URL + "/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p)
    });
    loadProducts();
  } catch (err) {
    console.error("Error agregando producto:", err);
  }
}

// ELIMINAR PRODUCTO
async function removeProduct(id) {
  if (!confirm("¿Eliminar producto?")) return;
  try {
    await fetch(BASE_URL + "/products/" + id, { method: "DELETE" });
    loadProducts();
  } catch (err) {
    console.error("Error eliminando producto:", err);
  }
}

// RENDERIZAR PRODUCTOS
function render(products) {
  const container = document.getElementById("products");
  const search = document.getElementById("search")?.value.toLowerCase() || "";
  container.innerHTML = "";

  let filtered;
  if (currentUser.rol === "admin") filtered = products;
  else if (currentUser.rol === "encargado") filtered = products.filter(p => p.areaActual.responsable === currentUser.username);
  else filtered = products.filter(p => p.cliente === currentUser.username);

  filtered
    .filter(p => p.nombre.toLowerCase().includes(search))
    .forEach(p => {
      container.innerHTML += `
        <div class="card-product">
          <img src="${p.imagen}" alt="${p.nombre}">
          <h4>${p.nombre}</h4>
          <p>Tipo: ${p.tipo}</p>
          <p>Stock: ${p.stock}</p>
          <p>Cliente: ${p.cliente}</p>
          ${renderAreas(p.areas)}
          ${currentUser.rol !== "cliente" ? `<button onclick="removeProduct('${p._id}')">Eliminar</button>` : ''}
        </div>
      `;
    });
}

// RENDER ÁREAS
function renderAreas(areas) {
  return areas.map(a => `
    <div>
      <p>${a.nombre} - ${a.procesadas}/${a.procesadas + a.pendientes}</p>
      <div class="progress-bar">
        <div class="progress" style="width:${(a.procesadas / (a.procesadas + a.pendientes || 1)) * 100}%"></div>
      </div>
      <p class="status">${a.nombre}</p>
    </div>
  `).join('');
}

// MODAL SOPORTE
function openSupport() { document.getElementById("supportModal").style.display = "flex"; }
function closeSupport() { document.getElementById("supportModal").style.display = "none"; }
function develop() { if (currentUser.rol === "admin") alert("Función develop() activada"); }