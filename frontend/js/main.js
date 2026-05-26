/* ================= LOGIN ================= */

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

    const data =
      await response.json();

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

      window.location.href =
        "/dashboard";

    } else {

      alert(
        data.msg || "Login incorrecto"
      );

    }

  } catch (err) {

    console.log(err);

    alert("Error servidor");

  }

}

/* ================= LOGOUT ================= */

function logout() {

  localStorage.clear();

  window.location.href = "/";

}

/* ================= SECTIONS ================= */

function showSection(section) {

  const sections = [

    "inicio",
    "inventario",
    "produccion",
    "reportes",
    "config"

  ];

  sections.forEach(sec => {

    const element =
      document.getElementById(
        sec + "Section"
      );

    if (element) {

      element.style.display =
        "none";

    }

  });

  const currentSection =
    document.getElementById(
      section + "Section"
    );

  if (currentSection) {

    currentSection.style.display =
      "block";

  }

}

/* ================= CRUD PRODUCTS ================= */

const form =
  document.getElementById(
    "productForm"
  );

const productosDiv =
  document.getElementById(
    "productos"
  );

/* SOLO dashboard */

if (form && productosDiv) {

  cargarProductos();

  /* AGREGAR */

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const nombre =
        document.getElementById(
          "nombre"
        ).value;

      const cantidad =
        document.getElementById(
          "cantidad"
        ).value;

      const estado =
        document.getElementById(
          "estado"
        ).value;

      try {

        const response =
          await fetch(
            "/api/products",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                nombre,
                cantidad,
                estado

              })

            }
          );

        if (response.ok) {

          form.reset();

          cargarProductos();

        }

      } catch (err) {

        console.log(err);

      }

    }
  );

}

/* ================= CARGAR PRODUCTOS ================= */

async function cargarProductos() {

  if (!productosDiv) return;

  try {

    const response =
      await fetch(
        "/api/products"
      );

    const productos =
      await response.json();

    productosDiv.innerHTML = "";

    productos.forEach(producto => {

      productosDiv.innerHTML += `

      <div class="product-item">

        <div>

          <h3>
            ${producto.nombre}
          </h3>

          <p>
            Cantidad:
            ${producto.cantidad}
          </p>

          <p>
            Estado:
            ${producto.estado}
          </p>

        </div>

        <button
          class="delete-btn"
          onclick="eliminarProducto(
            '${producto._id}'
          )"
        >

          Eliminar

        </button>

      </div>

      `;

    });

  } catch (err) {

    console.log(err);

  }

}

/* ================= ELIMINAR ================= */

async function eliminarProducto(id) {

  try {

    await fetch(

      "/api/products/" + id,

      {
        method: "DELETE"
      }

    );

    cargarProductos();

  } catch (err) {

    console.log(err);

  }

}