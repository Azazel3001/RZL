const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true
    },

    accion: {
        type: String,
        required: true
    },

    producto: {
        type: String,
        default: ""
    },

    proceso: {
        type: String,
        default: ""
    },

    comentario: {
        type: String,
        default: ""
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        "Log",
        LogSchema
    );