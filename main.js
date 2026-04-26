const BASE_URL = window.location.origin;

function login() {
  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userInput.value,
      password: passInput.value
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("user", data.username);

      // animación entrada
      document.body.style.opacity = 0;

      setTimeout(() => {
        location.reload();
      }, 500);
    });
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}
let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const p = {
    name: name.value,
    price: price.value,
    stock: stock.value,
    img: img.value || "https://via.placeholder.com/150"
  };

  products.push(p);
  save();
  render();
}

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

function render() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p, i) => {
    container.innerHTML += `
        <div class="card-product">
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p class="price">$${p.price}</p>
            <p class="${p.stock < 5 ? 'low' : ''}">
                Stock: ${p.stock}
            </p>
            <button class="delete" onclick="removeProduct(${i})">
                Eliminar
            </button>
        </div>
        `;
  });
}

function removeProduct(i) {
  products.splice(i, 1);
  save();
  render();
}

/* cargar */
setTimeout(render, 500);