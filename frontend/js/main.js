const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

async function cargarProductos() {

  const res = await fetch("/api/products");
  const productos = await res.json();

  productosDiv.innerHTML = "";

  let corte = 0;
  let confeccion = 0;
  let acabados = 0;
  let calidad = 0;

  let totalProducciones = productos.length;
  let totalPiezas = 0;

  productos.forEach(producto => {

    totalPiezas += Number(producto.cantidad || 0);

    if (producto.proceso === "Corte") corte++;
    if (producto.proceso === "Confeccion") confeccion++;
    if (producto.proceso === "Acabados") acabados++;
    if (producto.proceso === "Calidad") calidad++;

    productosDiv.innerHTML += `

        <div class="product-item">

            <h2>${producto.nombre}</h2>

            <p><strong>Cantidad:</strong> ${producto.cantidad}</p>

            <p><strong>Color:</strong> ${producto.color || "-"}</p>

            <p><strong>Talla:</strong> ${producto.talla || "-"}</p>

            <p><strong>Lote:</strong> ${producto.lote || "-"}</p>

            <p><strong>Proceso:</strong> ${producto.proceso}</p>

            <p><strong>Estado:</strong> ${producto.estado}</p>

            <p><strong>Responsable:</strong> ${producto.responsable || "Sin asignar"}</p>

            <p><strong>Ubicación:</strong> ${producto.ubicacionActual || "-"}</p>

            <p><strong>Progreso:</strong> ${producto.progreso || 0}%</p>

            <progress
                value="${producto.progreso || 0}"
                max="100">
            </progress>

            <h4>Historial</h4>

            <ul>

                ${(producto.historial || []).map(item => `

                    <li>

                        ${item.proceso}
                        -
                        ${item.estado}
                        -
                        ${item.usuario}

                    </li>

                `).join("")}

            </ul>

            <button onclick="eliminarProducto('${producto._id}')">

                Eliminar

            </button>

        </div>

        `;
  });

  const corteEl = document.getElementById("corteCount");
  const confeccionEl = document.getElementById("confeccionCount");
  const acabadosEl = document.getElementById("acabadosCount");
  const calidadEl = document.getElementById("calidadCount");

  if (corteEl) corteEl.innerText = corte;
  if (confeccionEl) confeccionEl.innerText = confeccion;
  if (acabadosEl) acabadosEl.innerText = acabados;
  if (calidadEl) calidadEl.innerText = calidad;

  const totalProduccionesEl =
    document.getElementById("totalProducciones");

  const totalPiezasEl =
    document.getElementById("totalPiezas");

  if (totalProduccionesEl)
    totalProduccionesEl.innerText = totalProducciones;

  if (totalPiezasEl)
    totalPiezasEl.innerText = totalPiezas;
}

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nuevoProducto = {

      nombre:
        document.getElementById("nombre").value,

      cantidad:
        document.getElementById("cantidad").value,

      color:
        document.getElementById("color").value,

      talla:
        document.getElementById("talla").value,

      lote:
        document.getElementById("lote").value,

      proceso:
        document.getElementById("proceso").value,

      progreso: 0,

      estado: "Pendiente",

      ubicacionActual:
        document.getElementById("proceso").value,

      historial: [

        {
          proceso:
            document.getElementById("proceso").value,

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

      body: JSON.stringify(
        nuevoProducto
      )

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