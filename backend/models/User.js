const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rol: String,
    area: String,
    expirado: Boolean,
    tiempoMaximo: Number,
    inicioSesion: Date
});

module.exports = mongoose.model("User", userSchema);