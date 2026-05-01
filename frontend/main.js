let currentUser = null;

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.error) { alert(data.error); return; }
  currentUser = data;
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = 'flex';
  cargarProduccion();
  cargarUsuarios();
});

// SIDEBAR
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav ul li').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(item.dataset.section).classList.add('active');
  });
});

document.getElementById('cerrarSesion').addEventListener('click', () => {
  currentUser = null;
  document.getElementById('dashboardPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
});

// PRODUCCIÓN
async function cargarProduccion() {
  const res = await fetch('/products');
  const products = await res.json();
  const container = document.getElementById('productionFlow');
  container.innerHTML = "";
  products.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `<h4>${p.nombre}</h4><p>Cliente: ${p.cliente}</p>
      <div class="progress-bar"><div class="progress-bar-inner" style="width:${(p.areaActual.procesadas / (p.areaActual.procesadas + p.areaActual.pendientes || 1)) * 100}%"></div></div>
      <p>${p.areaActual.procesadas}/${p.areaActual.procesadas + p.areaActual.pendientes}</p>`;
    card.addEventListener('click', () => abrirModal(idx, p));
    container.appendChild(card);
  });
}

// MODAL
const modal = document.getElementById('modalDetalle');
const detalleModal = document.getElementById('detalleProductoModal');
const closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', () => modal.style.display = 'none');

function abrirModal(idx, producto) {
  detalleModal.innerHTML = `<h4>${producto.nombre}</h4>
    <p>Cliente: ${producto.cliente}</p>
    <ul>${producto.areas.map(a => `<li>${a.nombre}: ${a.procesadas}/${a.procesadas + a.pendientes}</li>`).join('')}</ul>
    <button onclick="cambiarEstado('${producto._id}')">Cambiar estado etapa actual</button>`;
  modal.style.display = 'flex';
}

// Cambiar estado
async function cambiarEstado(id) {
  // Lógica de ejemplo: marcar etapa como completada
  const res = await fetch('/products/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({/* nuevo estado */ }) });
  modal.style.display = 'none';
  cargarProduccion();
}

// USUARIOS DE MUESTRA
async function cargarUsuarios() {
  // Por ahora hardcode
  const usuarios = [
    { cliente: "Boutique Elegance", inicio: "10:15 AM", tiempo: "00:45:12", estado: "Activo" },
    { cliente: "Fashion Store", inicio: "09:30 AM", tiempo: "00:20:05", estado: "Activo" }
  ];
  const tabla = document.getElementById('tablaUsuarios');
  tabla.innerHTML = `<tr><th>Cliente</th><th>Inicio</th><th>Tiempo</th><th>Estado</th></tr>` +
    usuarios.map(u => `<tr><td>${u.cliente}</td><td>${u.inicio}</td><td>${u.tiempo}</td><td>${u.estado}</td></tr>`).join('');
}