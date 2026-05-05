require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(e => console.log("❌ MongoDB error:", e));

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.json({ error: "Usuario o contraseña incorrecta" });
    if (user.expirado) return res.json({ error: "Usuario bloqueado" });

    if (user.rol === "cliente" && user.tiempoMaximo) user.inicioSesion = Date.now();
    res.json({ success: true, username: user.username, rol: user.rol, area: user.area || null });
});

// LISTAR PRODUCTOS
app.get("/products", async (req, res) => {
    const { rol, username } = req.query;
    let products = await Product.find();

    if (rol === "encargado") products = products.filter(p => p.areaActual.responsable === username);
    if (rol === "cliente") products = products.filter(p => p.cliente === username);

    res.json(products);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));