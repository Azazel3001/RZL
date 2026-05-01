console.log("🔥 Iniciando servidor...");

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
    .then(() => console.log("✅ Mongo conectado"))
    .catch(err => console.log(err));

// CREAR USUARIOS INICIALES
async function seedUsers() {
    const count = await User.countDocuments();
    if (count === 0) {
        await User.insertMany([
            { username: "admin", password: "1234", rol: "admin" },
            { username: "juan", password: "123", rol: "encargado", area: "Corte" },
            { username: "cliente", password: "demo", rol: "cliente", tiempoMaximo: 30 }
        ]);
        console.log("Usuarios creados");
    }
}
seedUsers();

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) return res.json({ error: "Credenciales incorrectas" });

    if (user.rol === "cliente" && user.tiempoMaximo) {
        user.inicioSesion = Date.now();
        await user.save();
    }

    res.json(user);
});

// GET PRODUCTOS (con filtro por rol)
app.get("/products", async (req, res) => {
    const { rol, username } = req.query;

    let products;

    if (rol === "admin") {
        products = await Product.find();
    } else if (rol === "encargado") {
        products = await Product.find({ "areaActual.responsable": username });
    } else {
        products = await Product.find({ cliente: username });
    }

    res.json(products);
});

// CREAR PRODUCTO
app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true });
});

// ELIMINAR
app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(PORT, () => console.log("🚀 Server listo"));
app.listen(PORT, () => {
    console.log("🚀 Server listo en puerto " + PORT);
});
