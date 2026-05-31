async function cargarProductos() {

    try {

        const res = await fetch("/api/products");

        const productos = await res.json();

        const contenedor =
            document.getElementById("productos");

        contenedor.innerHTML = "";

        productos.forEach(producto => {

            contenedor.innerHTML += `

            <div class="product-item">

                <div class="product-header">

                    <h2>${producto.nombre}</h2>

                    <span class="estado">
                        ${producto.estado}
                    </span>

                </div>

                <p>
                    📦 Cantidad:
                    ${producto.cantidad}
                </p>

                <p>
                    🎨 Color:
                    ${producto.color || "-"}
                </p>

                <p>
                    📏 Talla:
                    ${producto.talla || "-"}
                </p>

                <p>
                    🏷️ Lote:
                    ${producto.lote || "-"}
                </p>

                <p>
                    🏭 Proceso:
                    ${producto.proceso || "-"}
                </p>

                <p>
                    👤 Responsable:
                    ${producto.responsable || "Sin asignar"}
                </p>

                <p>
                    📍 Ubicación:
                    ${producto.ubicacionActual || "-"}
                </p>

                <p>
                    📊 Avance:
                    ${producto.progreso || 0}%
                </p>

                <div class="progress-bar">

                    <div
                    class="progress-fill"
                    style="width:${producto.progreso || 0}%">
                    </div>

                </div>

                <button
                onclick="verDetalle('${producto._id}')">

                    Ver detalle

                </button>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

function verDetalle(id) {

    window.location.href =
        "/historial?id=" + id;

}

cargarProductos();