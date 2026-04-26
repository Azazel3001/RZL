const BASE_URL = window.location.origin;

// LOGIN
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

      // guardar usuario
      localStorage.setItem("user", data.username);

      // 🎉 mensaje dinámico
      document.getElementById("welcomeText").innerText =
        "Bienvenido " + data.username + " 🚀";

      // animación salida login
      document.getElementById("login").classList.add("fade-out");

      setTimeout(() => {
        location.reload();
      }, 500);
    });
}

// INICIAR APP
function start() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  login.style.display = "none";
  app.style.display = "block";

  const user = localStorage.getItem("user");

  document.querySelector(".card").innerHTML = `
        <h3>Bienvenido ${user} 👑</h3>
        <p>Sistema LZR activo correctamente 🚀</p>
    `;
}
const role = localStorage.getItem("role");
document.getElementById("roleTag").innerText = "👤 " + role;


// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// AUTO LOGIN
if (localStorage.getItem("user")) {
  start();
}