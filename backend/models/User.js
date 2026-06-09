const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    usuario: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        default: "operador"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);