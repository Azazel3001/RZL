/* ================= ELEMENTOS ================= */

const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

/* ================= CARGAR ORDENES ================= */

async function cargarProductos() {

    try {

        const res = await fetch("/api/products");

        if (!res.ok) {
            throw new Error("Error al obtener productos");
        }

        const productos = await res.json();

        if (!productosDiv) return;

        productosDiv.innerHTML = "";

        let totalProducciones = productos.length;
        let totalPiezas = 0;
        let sumaProgreso = 0;

        productos.forEach(producto => {

            totalPiezas += Number(producto.cantidad || 0);
            sumaProgreso += Number(producto.progreso || 0);

            productosDiv.innerHTML += `
                <tr>
                    <td>${producto.cliente || "-"}</td>
                    <td>${producto.modelo || "-"}</td>
                    <td>${producto.producto || "-"}</td>
                    <td>${producto.talla || "-"}</td>
                    <td>${producto.cantidad || 0}</td>

                    <td>
                        <strong>${producto.areaActual || "-"}</strong>
                    </td>

                    <td>
                        ${producto.usuarioResponsable || "-"}
                    </td>

                    <td>
                        ${producto.fechaEntrega
                    ? new Date(producto.fechaEntrega).toLocaleDateString()
                    : "-"
                }
                    </td>

                    <td>
                        ${producto.urgente ? "🚨 SI" : "NO"}
                    </td>

                    <td>
                        <button onclick="cambiarArea('${producto._id}')">
                            Cambiar Área
                        </button>

                        <button onclick="agregarNota('${producto._id}')">
                            Nota
                        </button>

                        <button onclick="eliminarProducto('${producto._id}')">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

        const avanceGeneral =
            productos.length > 0
                ? Math.round(sumaProgreso / productos.length)
                : 0;

        actualizarTexto("totalProducciones", totalProducciones);
        actualizarTexto("totalPiezas", totalPiezas);
        actualizarTexto("avanceGeneral", avanceGeneral + "%");

    } catch (error) {
        console.error("Error cargando productos:", error);
    }

}

/* ================= ACTUALIZAR TEXTO ================= */

function actualizarTexto(id, valor) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.innerText = valor;
    }

}

/* ================= CREAR ORDEN ================= */

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nuevaOrden = {
            cliente: document.getElementById("cliente").value,
            modelo: document.getElementById("modelo").value,
            producto: document.getElementById("producto").value,
            cantidad: Number(document.getElementById("cantidad").value),
            talla: document.getElementById("talla").value,
            usuarioResponsable: document.getElementById("usuarioResponsable").value,
            areaActual: document.getElementById("areaActual").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            fechaEntrega: document.getElementById("fechaEntrega").value,
            urgente: document.getElementById("urgente").checked,
            piezasDanadas: Number(document.getElementById("piezasDanadas").value),
            observaciones: document.getElementById("observaciones").value,
            estado: "Pendiente",
            progreso: 0,
            historial: [
                {
                    area: document.getElementById("areaActual").value,
                    usuario: "Admin",
                    accion: "Creado",
                    comentario: "Orden creada"
                }
            ]
        };

        try {

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaOrden)
            });

            if (!res.ok) {

                const errorData = await res.json();

                console.log("ERROR BACKEND:", errorData);

                throw new Error(errorData.error || "Error al guardar la orden");
            }

        } catch (error) {

            console.error("Error guardando orden:", error);
            alert("No se pudo guardar la orden");

        }

    });

}

/* ================= CAMBIAR AREA ================= */

async function cambiarArea(id) {

    const nuevaArea = prompt(
        "Nueva Área:\n\nDiseño\nDiseño Grafico\nCorte\nConfeccion\nBordado\nDTF\nTerminado"
    );

    if (!nuevaArea) return;

    await fetch("/api/products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            areaActual: nuevaArea
        })
    });

    cargarProductos();

}

/* ================= AGREGAR NOTA ================= */

async function agregarNota(id) {

    const nota = prompt("Escribe la nota");

    if (!nota) return;

    const res = await fetch("/api/products/" + id);
    const producto = await res.json();

    const notas = producto.notas || [];

    notas.push({
        usuario: "Admin",
        comentario: nota
    });

    await fetch("/api/products/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            notas
        })
    });

    cargarProductos();

}

/* ================= ELIMINAR ================= */

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar orden?")) return;

    await fetch("/api/products/" + id, {
        method: "DELETE"
    });

    cargarProductos();

}

/* ================= INICIO ================= */

cargarProductos();
