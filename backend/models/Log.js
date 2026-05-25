const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({

    usuario: String,

    accion: String,

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Log", LogSchema);