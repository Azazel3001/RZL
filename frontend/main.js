async function login() {

  const username =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    const response = await fetch(
      "/api/users/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // 🔥 REDIRECT CORRECTO
      window.location.replace("/dashboard");

    } else {

      alert(data.msg);

    }

  } catch (err) {

    console.log(err);

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