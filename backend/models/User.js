const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            "admin",
            "corte",
            "confeccion",
            "acabados",
            "calidad"
        ],
        default: "corte"
    },

    nombre: {
        type: String,
        default: ""
    },

    activo: {
        type: Boolean,
        default: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        "User",
        UserSchema
    );