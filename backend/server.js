const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Product = require("./models/Product");
const User = require("./models/User");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());

/* ================= MONGODB ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongo conectado");
  })
  .catch((err) => {
    console.log("❌ Error Mongo:", err);
  });

/* ================= STATIC FILES ================= */

app.use(
  express.static(
    path.resolve(__dirname, "../frontend")
  )
);

/* ================= LOGIN ================= */

app.post("/api/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password
    });

    if (!user) {

      return res.status(401).json({
        msg: "Usuario o contraseña incorrectos"
      });

    }

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      msg: "Error servidor"
    });

  }

});

/* ================= PRODUCTS ================= */

/* GET PRODUCTS */

app.get("/api/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      msg: "Error obteniendo productos"
    });

  }

});

/* CREATE PRODUCT */

app.post("/api/products", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.json(product);

  } catch (error) {

    res.status(500).json({
      msg: "Error creando producto"
    });

  }

});

/* DELETE PRODUCT */

app.delete("/api/products/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Producto eliminado"
    });

  } catch (error) {

    res.status(500).json({
      msg: "Error eliminando producto"
    });

  }

});

/* ================= ROUTES ================= */

/* LOGIN PAGE */

app.get("/", (req, res) => {

  res.sendFile(
    path.resolve(__dirname, "../frontend/index.html")
  );

});

/* DASHBOARD */

app.get("/dashboard", (req, res) => {

  res.sendFile(
    path.resolve(__dirname, "../frontend/dashboard.html")
  );

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`🚀 Servidor activo en puerto ${PORT}`);

});