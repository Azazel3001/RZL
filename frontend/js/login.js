const btn = document.getElementById("loginBtn");

if (btn) {

    btn.addEventListener("click", async () => {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMsg = document.getElementById("errorMsg");

        try {

            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {

                if (errorMsg) {
                    errorMsg.innerText = data.msg || "Error de login";
                }

                return;
            }

            // guardar usuario simple (sin token por ahora)
            localStorage.setItem("user", JSON.stringify(data));

            window.location.href = "/dashboard";

        } catch (error) {

            console.error(error);

            if (errorMsg) {
                errorMsg.innerText = "Error de conexión";
            }

        }

    });

}