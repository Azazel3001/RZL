const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "encargado", "cliente"], required: true },
    area: String,
    expirado: { type: Boolean, default: false },
    tiempoMaximo: Number,
    inicioSesion: Date
});

module.exports = mongoose.model("User", userSchema);