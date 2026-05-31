const btn = document.getElementById("loginBtn");

if (btn) {

    btn.addEventListener("click", async () => {

        const username =
            document.getElementById("username")?.value;

        const password =
            document.getElementById("password")?.value;

        const errorMsg =
            document.getElementById("errorMsg");

        try {

            const res = await fetch(
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

            const data = await res.json();

            if (data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                window.location.href =
                    "/dashboard";

            } else {

                if (errorMsg) {

                    errorMsg.innerText =
                        data.msg ||
                        "Credenciales incorrectas";

                }

            }

        } catch (error) {

            console.error(error);

            if (errorMsg) {

                errorMsg.innerText =
                    "Error de conexión";

            }

        }

    });

}