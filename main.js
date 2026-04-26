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