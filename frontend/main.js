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
    alert("Error login");
  }
});

// ================= CRUD =================

async function loadProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.quantity}</p>
        <p>${p.status}</p>
        <button onclick="deleteProduct('${p._id}')">Eliminar</button>
      </div>
    `;
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

loadProducts();