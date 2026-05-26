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