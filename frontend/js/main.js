const form =
  document.getElementById(
    "productForm"
  );

const productosDiv =
  document.getElementById(
    "productos"
  );

/* ================= GET PRODUCTS ================= */

async function cargarProductos() {

  const res =
    await fetch("/api/products");

  const productos =
    await res.json();

  productosDiv.innerHTML = "";

  productos.forEach(producto => {

    productosDiv.innerHTML += `

        <div class="product-item">

            <div>

                <h2>${producto.nombre}</h2>

                <p>
                Cantidad:
                ${producto.cantidad}
                </p>

                <p>
                Color:
                ${producto.color}
                </p>

                <p>
                Talla:
                ${producto.talla}
                </p>

                <p>
                Lote:
                ${producto.lote}
                </p>

                <p>
                Proceso:
                ${producto.proceso}
                </p>

                <p>
                Responsable:
                ${producto.responsable || "Sin asignar"}
                </p>

                <p>
                Ubicación:
                ${producto.ubicacionActual || "Sin ubicación"}
                </p>

            </div>

            <div>

                <button
                onclick="eliminarProducto('${producto._id}')">

                    Eliminar

                </button>

            </div>

        </div>

        `;

  });

}

/* ================= CREATE ================= */

if (form) {

  form.addEventListener(
    "submit",
    async (e) => {

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

        estado: "En proceso",

        ubicacionActual:
          document.getElementById("proceso").value,

        historial: [

          {

            proceso:
              document.getElementById("proceso").value,

            estado: "Iniciado",

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

/* ================= DELETE ================= */

async function eliminarProducto(id) {

  await fetch(

    "/api/products/" + id,

    {

      method: "DELETE"

    }

  );

  cargarProductos();

}

cargarProductos();