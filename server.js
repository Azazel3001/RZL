const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ SERVIR ARCHIVOS DESDE RAÍZ
app.use(express.static(__dirname));

// 🔐 LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "LZR" && password === "1234") {
        return res.json({ success: true, username: "LZR" });
    }

    res.json({ error: "Credenciales incorrectas" });
});

// 🔥 RUTA FINAL
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log("🚀 LZR PRO ONLINE"));