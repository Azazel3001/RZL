// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    window.location.href = "/dashboard";
  } else {
    alert("Login incorrecto");
  }
});

// ========================
// PRODUCTOS DINÁMICOS
// ========================
async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Cantidad: ${p.quantity}</p>
      <p>Estado: ${p.status}</p>
      <button onclick="deleteProduct('${p._id}')">Eliminar</button>
    `;

    container.appendChild(div);
  });
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const status = document.getElementById("status").value;

  await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, quantity, status })
  });

  loadProducts();
}

async function deleteProduct(id) {
  await fetch("/api/products/" + id, { method: "DELETE" });
  loadProducts();
}

// Cargar productos en dashboard
loadProducts();