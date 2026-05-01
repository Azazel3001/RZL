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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(err => {
        console.error("❌ Error MongoDB:", err);
        process.exit(1);
    });

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) return res.json({ error: "Usuario o contraseña incorrecta" });
    res.json(user);
});

// PRODUCTOS
app.get("/products", async (req, res) => {
    const productos = await Product.find();
    res.json(productos);
});

app.post("/products", async (req, res) => {
    const nuevo = new Product(req.body);
    await nuevo.save();
    res.json({ success: true });
});

app.put("/products/:id", async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
});

app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Frontend fallback
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));

app.listen(PORT, () => console.log(`🚀 LZR Services ONLINE en http://localhost:${PORT}`));