const form = document.getElementById("productForm");
const productosDiv = document.getElementById("productos");

let productos = [];

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const estado = document.getElementById("estado").value;

  const producto = {
    nombre,
    cantidad,
    estado
  };

  productos.push(producto);

  renderProductos();

  form.reset();

});

function renderProductos() {

  productosDiv.innerHTML = "";

  productos.forEach((producto, index) => {

    productosDiv.innerHTML += `

        <div class="product-item">

            <div>

                <h3>${producto.nombre}</h3>

                <p>Cantidad: ${producto.cantidad}</p>

                <p>Estado: ${producto.estado}</p>

            </div>

            <button class="delete-btn" onclick="eliminar(${index})">
                Eliminar
            </button>

        </div>

        `;

  });

}

function eliminar(index) {

  productos.splice(index, 1);

  renderProductos();

}