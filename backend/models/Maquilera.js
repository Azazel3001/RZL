const mongoose = require("mongoose");

const MaquileraSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    responsable: {
        type: String,
        default: ""
    },

    telefono: {
        type: String,
        default: ""
    },

    direccion: {
        type: String,
        default: ""
    },

    activa: {
        type: Boolean,
        default: true
    },

    fechaRegistro: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Maquilera",
    MaquileraSchema
);