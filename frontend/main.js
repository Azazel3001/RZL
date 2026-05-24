/* ================= LOGIN ================= */

async function login() {

  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) {

    alert("Completa los campos");

    return;

  }

  try {

    const response = await fetch("/api/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: email,
        password: password
      })

    });

    if (!response.ok) {

      alert("Usuario o contraseña incorrectos");

      return;

    }

    window.location.href = "/dashboard";

  } catch (error) {

    console.log(error);

    alert("Error servidor");

  }

}

/* ================= CRUD PRODUCTS ================= */

const form = document.getElementById("productForm");

const productosDiv = document.getElementById("productos");

/* SOLO ejecutar si existe dashboard */

if (form && productosDiv) {

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

                <button 
                    class="delete-btn"
                    onclick="eliminar(${index})"
                >
                    Eliminar
                </button>

            </div>

            `;

    });

  }

  window.eliminar = function (index) {

    productos.splice(index, 1);

    renderProductos();

  };

}