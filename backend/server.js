require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔥 Servir frontend correctamente
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔥 Debug (puedes quitar después)
console.log("MONGO_URI:", process.env.MONGO_URI);

// 🔥 Conexión Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Mongo conectado"))
    .catch(err => {
        console.log("❌ Error Mongo:", err);
        process.exit(1); // <- evita que Render quede colgado
    });

// ================= LOGIN =================
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) return res.json({ error: "Usuario o contraseña incorrecta" });
    if (user.expirado) return res.json({ error: "Usuario bloqueado" });

    if (user.rol === "cliente" && user.tiempoMaximo) {
        user.inicioSesion = new Date();
        await user.save();
    }

    res.json(user);
});

// ================= PRODUCTOS =================

// GET
app.get("/products", async (req, res) => {
    const data = await Product.find();
    res.json(data);
});

// POST
app.post("/products", async (req, res) => {
    const p = new Product(req.body);
    await p.save();
    res.json({ success: true });
});

// DELETE
app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// 🔥 Fallback frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log("🚀 LZR ONLINE en puerto:", PORT);
});