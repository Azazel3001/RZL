async function cargarProductos() {

    const res =
        await fetch("/api/products");

    const data =
        await res.json();

    const contenedor =
        document.getElementById(
            "productos"
        );

    contenedor.innerHTML = "";

    data.forEach(product => {

        contenedor.innerHTML += `

        <div class="product-item">

            <img
            src="${product.foto}"
            width="120">

            <div>

                <h2>${product.nombre}</h2>

                <p>
                ${product.descripcion}
                </p>

                <p>
                Cantidad:
                ${product.cantidad}
                </p>

                <p>
                Etapa:
                ${product.etapa}
                </p>

            </div>

        </div>

        `;

    });

}

cargarProductos();

async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
    } else {
        alert("Error en login");
    }
}