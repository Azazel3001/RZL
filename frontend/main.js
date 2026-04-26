const BASE_URL = window.location.origin;

// LOGIN
function login() {
  const username = document.getElementById("userInput").value;
  const password = document.getElementById("passInput").value;

  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("user", data.username);
      localStorage.setItem("role", data.role);

      start();
    })
    .catch(() => alert("Error servidor"));
}

// INICIAR APP
function start() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  const role = localStorage.getItem("role");
  document.getElementById("roleTag").innerText = "👤 " + role;
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// AUTO LOGIN
if (localStorage.getItem("user")) {
  start();
}