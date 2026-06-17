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
        enum: ["admin", "operador"],
        default: "operador"
    },

    area: {
        type: String,
        enum: [
            "Diseño",
            "Diseño Grafico",
            "Corte",
            "Confeccion",
            "Bordado",
            "DTF",
            "Terminado"
        ],
        default: "Diseño"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);