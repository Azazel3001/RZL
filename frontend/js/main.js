const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

const AREAS = [
  "Diseño",
  "Diseño Grafico",
  "Corte",
  "Confeccion",
  "Bordado",
  "DTF",
  "Terminado"
];

async function cargarProductos() {

  ```
try {

    const res = await fetch("/api/products");
    const productos = await res.json();

    if (!productosDiv) return;

    productosDiv.innerHTML = "";

    let totalProducciones = productos.length;
    let totalPiezas = 0;
    let sumaProgreso = 0;

    const notificaciones = document.getElementById(
        "notificacionesUrgentes"
    );

    if (notificaciones) {
        notificaciones.innerHTML = "";
    }

    productos.forEach(producto => {

        totalPiezas += Number(producto.cantidad || 0);
        sumaProgreso += Number(producto.progreso || 0);

        if (producto.urgente && notificaciones) {

            notificaciones.innerHTML += 

                <div class="alerta-urgente">
                    🚨 ${producto.cliente} -
                    ${producto.producto} -
                    ${producto.areaActual}
                </div>
            `;
}

productosDiv.innerHTML += `
            <tr>

                <td>${producto.cliente || "-"}</td>

                <td>${producto.modelo || "-"}</td>

                <td>${producto.producto || "-"}</td>

                <td>${producto.talla || "-"}</td>

                <td>${producto.cantidad || 0}</td>

                <td>
                    <strong>
                        ${producto.areaActual || "-"}
                    </strong>
                </td>

                <td>
                    ${producto.usuarioResponsable || "-"}
                </td>

                <td>
                    ${producto.fechaEntrega
    ? new Date(
      producto.fechaEntrega
    ).toLocaleDateString()
    : "-"
  }
                </td>

                <td>
                    ${producto.urgente
    ? "🚨 SI"
    : "NO"
  }
                </td>

                <td>

                    <button onclick="siguienteArea('${producto._id}','${producto.areaActual}')">
                        ➡ Siguiente
                    </button>

                    <button onclick="cambiarArea('${producto._id}')">
                        🔄 Área
                    </button>

                    <button onclick="agregarNota('${producto._id}')">
                        📝 Nota
                    </button>

                    <button onclick="eliminarProducto('${producto._id}')">
                        🗑 Eliminar
                    </button>

                </td>

            </tr>
        ;
    });

    const avanceGeneral =
        productos.length > 0
            ? Math.round(
                  sumaProgreso /
                      productos.length
              )
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
```

function actualizarTexto(id, valor) {

  ```
const elemento =
    document.getElementById(id);

if (elemento) {

    elemento.innerText = valor;

}
```

}

if (form) {

  ```
form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const nuevaOrden = {

            cliente:
                document.getElementById(
                    "cliente"
                ).value,

            modelo:
                document.getElementById(
                    "modelo"
                ).value,

            producto:
                document.getElementById(
                    "producto"
                ).value,

            cantidad: Number(
                document.getElementById(
                    "cantidad"
                ).value
            ),

            talla:
                document.getElementById(
                    "talla"
                ).value,

            usuarioResponsable:
                document.getElementById(
                    "usuarioResponsable"
                ).value,

            areaActual:
                document.getElementById(
                    "areaActual"
                ).value,

            fechaInicio:
                document.getElementById(
                    "fechaInicio"
                ).value,

            fechaEntrega:
                document.getElementById(
                    "fechaEntrega"
                ).value,

            urgente:
                document.getElementById(
                    "urgente"
                ).checked,

            piezasDanadas: Number(
                document.getElementById(
                    "piezasDanadas"
                ).value
            ),

            observaciones:
                document.getElementById(
                    "observaciones"
                ).value,

            estado: "Pendiente",

            progreso: 0,

            notas: [],

            historial: [
                {
                    area:
                        document.getElementById(
                            "areaActual"
                        ).value,

                    usuario: "Admin",

                    accion:
                        "Orden Creada",

                    comentario:
                        "Creación inicial"
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
                    nuevaOrden
                )
            }
        );

        form.reset();

        cargarProductos();
    }
);
```

}

async function cambiarArea(id) {

  ```
const nuevaArea = prompt(
    "Seleccione área:\n\nDiseño\nDiseño Grafico\nCorte\nConfeccion\nBordado\nDTF\nTerminado"
);

if (!nuevaArea) return;

await fetch(
    "/api/products/" + id,
    {
        method: "PUT",
        headers: {
            "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            areaActual: nuevaArea
        })
    }
);

cargarProductos();
```

}

async function siguienteArea(
  id,
  areaActual
) {

  ```
const index =
    AREAS.indexOf(areaActual);

if (index === -1) return;

const siguiente =
    AREAS[index + 1];

if (!siguiente) {

    alert(
        "La orden ya está terminada"
    );

    return;
}

await fetch(
    "/api/products/" + id,
    {
        method: "PUT",
        headers: {
            "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            areaActual: siguiente
        })
    }
);

cargarProductos();
```

}

async function agregarNota(id) {

  ```
const comentario = prompt(
    "Escribe la nota"
);

if (!comentario) return;

const res = await fetch(
    "/api/products/" + id
);

const producto =
    await res.json();

const notas =
    producto.notas || [];

notas.push({
    usuario: "Admin",
    comentario,
    fecha: new Date()
});

await fetch(
    "/api/products/" + id,
    {
        method: "PUT",
        headers: {
            "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            notas
        })
    }
);

cargarProductos();
```

}

async function eliminarProducto(id) {

  ```
const confirmar = confirm(
    "¿Eliminar esta orden?"
);

if (!confirmar) return;

await fetch(
    "/api/products/" + id,
    {
        method: "DELETE"
    }
);

cargarProductos();
```

}

cargarProductos();
