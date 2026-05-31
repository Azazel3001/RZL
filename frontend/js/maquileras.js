const form =
    document.getElementById(
        "maquileraForm"
    );

const lista =
    document.getElementById(
        "listaMaquileras"
    );

async function cargarMaquileras() {

    const res =
        await fetch(
            "/api/maquileras"
        );

    const data =
        await res.json();

    lista.innerHTML = "";

    data.forEach(maquilera => {

        lista.innerHTML += `

        <div class="product-item">

            <h3>${maquilera.nombre}</h3>

            <p>
                Responsable:
                ${maquilera.responsable}
            </p>

            <p>
                Teléfono:
                ${maquilera.telefono}
            </p>

            <p>
                Dirección:
                ${maquilera.direccion}
            </p>

            <button
            onclick="eliminarMaquilera('${maquilera._id}')">

                Eliminar

            </button>

        </div>

        `;

    });

}

if (form) {

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            await fetch(
                "/api/maquileras",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        nombre:
                            document.getElementById("nombre").value,

                        responsable:
                            document.getElementById("responsable").value,

                        telefono:
                            document.getElementById("telefono").value,

                        direccion:
                            document.getElementById("direccion").value

                    })

                }
            );

            form.reset();

            cargarMaquileras();

        }
    );

}

async function eliminarMaquilera(id) {

    await fetch(

        "/api/maquileras/" + id,

        {
            method: "DELETE"
        }

    );

    cargarMaquileras();

}

cargarMaquileras();