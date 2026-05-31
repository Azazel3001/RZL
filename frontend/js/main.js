const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

/* ================= CARGAR PRODUCTOS ================= */

async function cargarProductos() {

  try {

    const res = await fetch("/api/products");
    const productos = await res.json();

    if (!productosDiv) return;

    productosDiv.innerHTML = "";

    let corte = 0;
    let confeccion = 0;
    let acabados = 0;
    let calidad = 0;

    let totalProducciones = productos.length;
    let totalPiezas = 0;
    let sumaProgreso = 0;

    productos.forEach(producto => {

      totalPiezas += Number(producto.cantidad || 0);
      sumaProgreso += Number(producto.progreso || 0);

      const proceso =
        (producto.proceso || "")
          .toLowerCase();

      if (proceso.includes("corte"))
        corte++;

      else if (proceso.includes("confe"))
        confeccion++;

      else if (proceso.includes("acab"))
        acabados++;

      else if (proceso.includes("calidad"))
        calidad++;

      productosDiv.innerHTML += `

            <div class="product-item">

                <h2>${producto.nombre || "-"}</h2>

                <p>
                    <strong>Cantidad:</strong>
                    ${producto.cantidad || 0}
                </p>

                <p>
                    <strong>Color:</strong>
                    ${producto.color || "-"}
                </p>

                <p>
                    <strong>Talla:</strong>
                    ${producto.talla || "-"}
                </p>

                <p>
                    <strong>Lote:</strong>
                    ${producto.lote || "-"}
                </p>

                <p>
                    <strong>Proceso:</strong>
                    ${producto.proceso || "-"}
                </p>

                <p>
                    <strong>Estado:</strong>
                    ${producto.estado || "-"}
                </p>

                <p>
                    <strong>Responsable:</strong>
                    ${producto.responsable || "Sin asignar"}
                </p>

                <p>
                    <strong>Ubicación:</strong>
                    ${producto.ubicacionActual || "-"}
                </p>

                <p>
                    <strong>Progreso:</strong>
                    ${producto.progreso || 0}%
                </p>

                <progress
                    value="${producto.progreso || 0}"
                    max="100">
                </progress>

                <h4>Historial</h4>

                <ul>

                    ${(producto.historial || [])
          .map(item => `

                        <li>
                            ${item.proceso || "-"}
                            -
                            ${item.estado || "-"}
                            -
                            ${item.usuario || "-"}
                        </li>

                    `).join("")}

                </ul>

                <div class="acciones">

                    <button
                        onclick="moverProceso('${producto._id}','Corte')">
                        Corte
                    </button>

                    <button
                        onclick="moverProceso('${producto._id}','Confeccion')">
                        Confección
                    </button>

                    <button
                        onclick="moverProceso('${producto._id}','Acabados')">
                        Acabados
                    </button>

                    <button
                        onclick="moverProceso('${producto._id}','Calidad')">
                        Calidad
                    </button>

                    <button
                        onclick="eliminarProducto('${producto._id}')">
                        Eliminar
                    </button>

                </div>

            </div>

            `;

    });

    const avanceGeneral =
      productos.length > 0
        ? Math.round(
          sumaProgreso /
          productos.length
        )
        : 0;

    actualizarTexto(
      "corteCount",
      corte
    );

    actualizarTexto(
      "confeccionCount",
      confeccion
    );

    actualizarTexto(
      "acabadosCount",
      acabados
    );

    actualizarTexto(
      "calidadCount",
      calidad
    );

    actualizarTexto(
      "totalProducciones",
      totalProducciones
    );

    actualizarTexto(
      "totalPiezas",
      totalPiezas
    );

    actualizarTexto(
      "avanceGeneral",
      avanceGeneral + "%"
    );

  } catch (error) {

    console.error(
      "Error cargando productos:",
      error
    );

  }

}

/* ================= ACTUALIZAR TEXTO ================= */

function actualizarTexto(id, valor) {

  const elemento =
    document.getElementById(id);

  if (elemento) {

    elemento.innerText = valor;

  }

}

/* ================= CREAR ================= */

if (form) {

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const proceso =
        document.getElementById("proceso").value;

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

        proceso,

        progreso: 0,

        estado: "Pendiente",

        ubicacionActual: proceso,

        historial: [

          {
            proceso,
            estado: "Creado",
            usuario: "Admin"
          }

        ]

      };

      await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            nuevoProducto
          )
        }
      );

      form.reset();

      cargarProductos();

    }
  );

}

/* ================= MOVER PROCESO ================= */

async function moverProceso(id, proceso) {

  let progreso = 25;

  if (proceso === "Confeccion")
    progreso = 50;

  if (proceso === "Acabados")
    progreso = 75;

  if (proceso === "Calidad")
    progreso = 100;

  await fetch(
    "/api/products/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        proceso,
        ubicacionActual: proceso,
        progreso
      })
    }
  );

  cargarProductos();

}

/* ================= ELIMINAR ================= */

async function eliminarProducto(id) {

  if (!confirm(
    "¿Eliminar producto?"
  )) return;

  await fetch(
    "/api/products/" + id,
    {
      method: "DELETE"
    }
  );

  cargarProductos();

}

/* ================= INICIO ================= */

cargarProductos();