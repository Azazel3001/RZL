const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        required: true
    },

    lote: {
        type: String
    },

    foto: {
        type: String
    },

    creadoPor: {
        type: String
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Product", ProductSchema);