const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

async function cargarProductos() {

  const res = await fetch("/api/products");
  const productos = await res.json();

  // 🔥 PROTECCIÓN IMPORTANTE
  if (!productosDiv) return;

  productosDiv.innerHTML = "";

  let corte = 0;
  let confeccion = 0;
  let acabados = 0;

  productos.forEach(producto => {

    if (producto.proceso === "Corte") corte++;
    if (producto.proceso === "Confección") confeccion++;
    if (producto.proceso === "Acabados") acabados++;

    productosDiv.innerHTML += `
        <div class="product-item">
            <div>
                <h2>${producto.nombre}</h2>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Color: ${producto.color}</p>
                <p>Talla: ${producto.talla}</p>
                <p>Lote: ${producto.lote}</p>
                <p>Proceso: ${producto.proceso}</p>
            </div>

            <div>
                <button onclick="eliminarProducto('${producto._id}')">
                    Eliminar
                </button>
            </div>
        </div>`;
  });

  // 🔥 PROTECCIÓN DE TARJETAS
  const corteEl = document.getElementById("corteCount");
  const confEl = document.getElementById("confeccionCount");
  const acabEl = document.getElementById("acabadosCount");

  if (corteEl) corteEl.innerText = corte;
  if (confEl) confEl.innerText = confeccion;
  if (acabEl) acabEl.innerText = acabados;
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: document.getElementById("nombre").value,
      cantidad: document.getElementById("cantidad").value,
      color: document.getElementById("color").value,
      talla: document.getElementById("talla").value,
      lote: document.getElementById("lote").value,
      proceso: document.getElementById("proceso").value,
      progreso: 0,
      estado: "En proceso",
      ubicacionActual: document.getElementById("proceso").value,
      historial: [{
        proceso: document.getElementById("proceso").value,
        estado: "Iniciado",
        usuario: "Admin"
      }]
    };

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto)
    });

    form.reset();
    cargarProductos();
  });
}

async function eliminarProducto(id) {
  await fetch("/api/products/" + id, {
    method: "DELETE"
  });

  cargarProductos();
}

cargarProductos();