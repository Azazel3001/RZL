```javascript
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
                <tr class="fila">

                    <td>
                        <strong>${producto.cliente || "-"}</strong>
                    </td>

                    <td>
                        ${producto.producto || "-"}
                        <br>
                        <small>${producto.modelo || ""}</small>
                    </td>

                    <td>
                        Cantidad: ${producto.cantidad || 0}
                        <br>
                        Talla: ${producto.talla || "-"}
                    </td>

                    <td>
                        <span class="area">
                            ${producto.areaActual || "-"}
                        </span>
                    </td>

                    <td>
                        ${producto.usuarioResponsable || "Sin asignar"}
                    </td>

                    <td>
                        ${
                            producto.fechaEntrega
                                ? new Date(producto.fechaEntrega).toLocaleDateString()
                                : "-"
                        }
                    </td>

                    <td>
                        <span class="${
                            producto.urgente ? "urgente" : "normal"
                        }">
                            ${
                                producto.urgente
                                    ? "🚨 Urgente"
                                    : (producto.estado || "Pendiente")
                            }
                        </span>
                    </td>

                    <td class="acciones">

                        <button onclick="cambiarArea('${producto._id}')">
                            🔄
                        </button>

                        <button onclick="agregarNota('${producto._id}')">
                            📝
                        </button>

                        <button onclick="eliminarProducto('${producto._id}')">
                            🗑
                        </button>

                    </td>

                </tr>
            `;

        });

        const avanceGeneral =
            productos.length > 0
                ? Math.round(sumaProgreso / productos.length)
                : 0;

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

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.innerText = valor;
    }

}

/* ================= CREAR ORDEN ================= */

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const usuarioActual =
            JSON.parse(localStorage.getItem("user"));

        const nuevaOrden = {

            cliente:
                document.getElementById("cliente").value,

            modelo:
                document.getElementById("modelo").value,

            producto:
                document.getElementById("producto").value,

            cantidad:
                Number(
                    document.getElementById("cantidad").value
                ),

            talla:
                document.getElementById("talla").value,

            usuarioResponsable:
                document.getElementById("usuarioResponsable").value,

            areaActual:
                document.getElementById("areaActual").value,

            fechaInicio:
                document.getElementById("fechaInicio").value,

            fechaEntrega:
                document.getElementById("fechaEntrega").value,

            urgente:
                document.getElementById("urgente").checked,

            piezasDanadas:
                Number(
                    document.getElementById("piezasDanadas").value
                ),

            observaciones:
                document.getElementById("observaciones").value,

            estado: "Pendiente",

            progreso: 0,

            creadoPor:
                usuarioActual?.usuario || "Admin",

            historial: [
                {
                    area:
                        document.getElementById("areaActual").value,

                    usuario:
                        usuarioActual?.usuario || "Admin",

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

                console.log(
                    "ERROR BACKEND:",
                    errorData
                );

                throw new Error(
                    errorData.error ||
                    "Error al guardar la orden"
                );

            }

            form.reset();

            await cargarProductos();

            alert("Orden creada correctamente");

        } catch (error) {

            console.error(
                "Error guardando orden:",
                error
            );

            alert(
                error.message ||
                "No se pudo guardar la orden"
            );

        }

    });

}


/* ================= CAMBIAR AREA ================= */

async function cambiarArea(id) {

    const nuevaArea = prompt(
        "Nueva Área:\n\nDiseño\nDiseño Grafico\nCorte\nConfeccion\nBordado\nDTF\nTerminado"
    );

    if (!nuevaArea) return;

    try {

        const res = await fetch("/api/products/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                areaActual: nuevaArea
            })

        });

        if (!res.ok) {
            throw new Error();
        }

        await cargarProductos();

    } catch {

        alert("No se pudo cambiar el área");

    }

}

/* ================= AGREGAR NOTA ================= */

async function agregarNota(id) {

    const nota = prompt("Escribe la nota");

    if (!nota) return;

    try {

        const res = await fetch("/api/products/" + id);

        const producto = await res.json();

        const notas = producto.notas || [];

        const usuarioActual =
            JSON.parse(localStorage.getItem("user"));

        notas.push({

            usuario:
                usuarioActual?.usuario || "Admin",

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

    } catch {

        alert("No se pudo agregar la nota");

    }

}

/* ================= ELIMINAR ================= */

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar esta orden?")) return;

    try {

        const res = await fetch("/api/products/" + id, {

            method: "DELETE"

        });

        if (!res.ok) {
            throw new Error();
        }

        alert("Orden eliminada");

        cargarProductos();

    } catch {

        alert("No se pudo eliminar");

    }

}

/* ================= INICIO ================= */

cargarProductos();

/* ================= MOSTRAR USUARIO LOGUEADO ================= */

const usuarioActual =
    JSON.parse(localStorage.getItem("user"));

if (usuarioActual) {

    const avatar =
        document.querySelector(".avatar");

    const nombre =
        document.querySelector(".user strong");

    const rol =
        document.querySelector(".user p");

    if (avatar) {

        avatar.innerText =
            usuarioActual.nombre?.charAt(0) || "U";

    }

    if (nombre) {

        nombre.innerText =
            usuarioActual.nombre || "Usuario";

    }

    if (rol) {

        rol.innerText =
            usuarioActual.rol || "Operador";

    }

}

/* ================= CREAR USUARIOS ================= */

const userForm =
    document.getElementById("userForm");

if (userForm) {

    userForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nuevoUsuario = {

            nombre:
                document.getElementById("nombreUser").value,

            usuario:
                document.getElementById("usuarioUser").value,

            password:
                document.getElementById("passwordUser").value,

            rol:
                document.getElementById("rolUser").value

        };

        try {

            const res = await fetch("/api/users", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(nuevoUsuario)

            });

            if (!res.ok) {

                const error =
                    await res.json();

                alert(
                    error.error ||
                    error.msg ||
                    "Error creando usuario"
                );

                return;

            }

            alert("Usuario creado correctamente");

            userForm.reset();

        } catch {

            alert("Error de conexión");

        }

    });

}
