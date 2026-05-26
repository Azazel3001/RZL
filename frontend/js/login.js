async function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch(
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

        alert(data.msg);

    }

}