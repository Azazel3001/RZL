async function cargarProductos() {

    const res = await fetch("/api/products");
    const data = await res.json();

    const contenedor = document.getElementById("productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    data.forEach(product => {

        contenedor.innerHTML += `
            <div class="product-item">

                <h2>${product.nombre}</h2>
                <p>Cantidad: ${product.cantidad}</p>
                <p>Proceso: ${product.proceso}</p>
                <p>Estado: ${product.estado}</p>

            </div>
        `;
    });
}

cargarProductos();