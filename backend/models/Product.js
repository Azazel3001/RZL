const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    stock: Number,
    imagen: String,
    cliente: String,
    areaActual: {
        nombre: String,
        responsable: String
    },
    areas: [
        {
            nombre: String,
            procesadas: Number,
            pendientes: Number,
            responsable: String,
            especificaciones: Object
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);