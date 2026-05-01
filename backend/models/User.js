const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role: String,
    area: String,
    expirado: Boolean,
    tiempoMaximo: Number,
    inicioSesion: Date
});
module.exports = mongoose.model("User", userSchema);