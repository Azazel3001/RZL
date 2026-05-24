const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const table = document.getElementById("productTable");

addBtn.onclick = () => {
  modal.style.display = "flex";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

let productos = [];

function renderProductos() {

  table.innerHTML = "";

  productos.forEach((p, index) => {

    table.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.cantidad}</td>
                <td>${p.estado}</td>
                <td>
                    <button class="delete" onclick="eliminarProducto(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
  });
}

function agregarProducto() {

  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const estado = document.getElementById("estado").value;

  if (!nombre || !cantidad) {
    return alert("Completa todos los campos");
  }

  productos.push({
    nombre,
    cantidad,
    estado
  });

  renderProductos();

  modal.style.display = "none";

  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
}

function eliminarProducto(index) {

  productos.splice(index, 1);

  renderProductos();
}