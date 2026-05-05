const express = require("express");
const path = require("path");

const app = express();

// Servir frontend correctamente
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas específicas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo"));