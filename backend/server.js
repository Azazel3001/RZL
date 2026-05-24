const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Product = require("./models/Product");
const User = require("./models/User");

const app = express();
app.use(express.json());

// 🔥 Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// 🔥 SERVIR FRONTEND (CLAVE)
app.use(express.static(path.join(__dirname, "../frontend")));

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) return res.status(401).json({ msg: "Error login" });

  res.json({ user });
});

// ================= CRUD =================

// GET productos
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST producto
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// DELETE producto
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Eliminado" });
});

// ================= RUTAS =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

// 🔥 EVITA ERRORES 404
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo"));