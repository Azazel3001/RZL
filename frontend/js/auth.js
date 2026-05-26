const token =
    localStorage.getItem("token");

console.log(
    "TOKEN:",
    token
);

/* RUTAS PRIVADAS */

const privateRoutes = [

    "/dashboard",
    "/inventario",
    "/produccion",
    "/corte",
    "/confeccion",
    "/acabados",
    "/calidad",
    "/reportes"

];

/* VERIFICAR */

const currentPath =
    window.location.pathname;

const isPrivate =
    privateRoutes.includes(
        currentPath
    );

if (isPrivate && !token) {

    window.location.href = "/";

}