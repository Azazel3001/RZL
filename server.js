const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ SERVIR FRONTEND (RUTA CORRECTA)
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "LZR" && password === "1234") {
    return res.json({ success: true, username: "LZR" });
  }

  res.json({ error: "Credenciales incorrectas" });
});

// ❗ SOLO AL FINAL
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => console.log("🚀 LZR PRO ONLINE"));