const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

async function cargarProductos() {

  try {

    const res = await fetch("/api/products");
    const productos = await res.json();

    // 🔴 protección contra páginas sin contenedor
    if (!productosDiv) return;

    productosDiv.innerHTML = "";

    let corte = 0;
    let confeccion = 0;
    let acabados = 0;
    let calidad = 0;

    let totalProducciones = productos.length;
    let totalPiezas = 0;

    productos.forEach(producto => {

      totalPiezas += Number(producto.cantidad || 0);

      // 🔥 normalización de texto (evita errores "Confeccion" vs "Confección")
      const proceso = (producto.proceso || "").toLowerCase();

      if (proceso.includes("corte")) corte++;
      else if (proceso.includes("confe")) confeccion++;
      else if (proceso.includes("acab")) acabados++;
      else if (proceso.includes("calidad")) calidad++;

      productosDiv.innerHTML += `

        <div class="product-item">

            <h2>${producto.nombre || "-"}</h2>

            <p><strong>Cantidad:</strong> ${producto.cantidad || 0}</p>
            <p><strong>Color:</strong> ${producto.color || "-"}</p>
            <p><strong>Talla:</strong> ${producto.talla || "-"}</p>
            <p><strong>Lote:</strong> ${producto.lote || "-"}</p>

            <p><strong>Proceso:</strong> ${producto.proceso || "-"}</p>
            <p><strong>Estado:</strong> ${producto.estado || "-"}</p>

            <p><strong>Responsable:</strong> ${producto.responsable || "Sin asignar"}</p>
            <p><strong>Ubicación:</strong> ${producto.ubicacionActual || "-"}</p>

            <p><strong>Progreso:</strong> ${producto.progreso || 0}%</p>

            <progress value="${producto.progreso || 0}" max="100"></progress>

            <h4>Historial</h4>

            <ul>
              ${(producto.historial || []).map(item => `
                <li>
                  ${item.proceso || "-"} -
                  ${item.estado || "-"} -
                  ${item.usuario || "-"}
                </li>
              `).join("")}
            </ul>

            <button onclick="eliminarProducto('${producto._id}')">
              Eliminar
            </button>

        </div>

      `;
    });

    // 🔥 actualizar tarjetas (con protección)
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.innerText = value;
    };

    setText("corteCount", corte);
    setText("confeccionCount", confeccion);
    setText("acabadosCount", acabados);
    setText("calidadCount", calidad);

    setText("totalProducciones", totalProducciones);
    setText("totalPiezas", totalPiezas);

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

/* ================= CREATE ================= */

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
      estado: "Pendiente",
      ubicacionActual: document.getElementById("proceso").value,

      historial: [
        {
          proceso: document.getElementById("proceso").value,
          estado: "Creado",
          usuario: "Admin"
        }
      ]
    };

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoProducto)
    });

    form.reset();
    cargarProductos();
  });
}

/* ================= DELETE ================= */

async function eliminarProducto(id) {

  await fetch("/api/products/" + id, {
    method: "DELETE"
  });

  cargarProductos();
}

/* INIT */
cargarProductos();