const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rol: String,
    area: String,
    tiempoMaximo: Number,
    inicioSesion: Number
});

module.exports = mongoose.model("User", userSchema);