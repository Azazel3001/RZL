const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function renderProductos() {

  productList.innerHTML = "";

  productos.forEach((producto, index) => {

    productList.innerHTML += `
      <div class="product">

        <h3>${producto.nombre}</h3>

        <p><strong>Cantidad:</strong> ${producto.cantidad}</p>

        <p><strong>Estado:</strong> ${producto.estado}</p>

        <button class="delete" onclick="eliminarProducto(${index})">
          Eliminar
        </button>

      </div>
    `;

  });

}

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const estado = document.getElementById("estado").value;

  productos.push({
    nombre,
    cantidad,
    estado
  });

  localStorage.setItem("productos", JSON.stringify(productos));

  renderProductos();

  form.reset();

});

function eliminarProducto(index) {

  productos.splice(index, 1);

  localStorage.setItem("productos", JSON.stringify(productos));

  renderProductos();

}

renderProductos();