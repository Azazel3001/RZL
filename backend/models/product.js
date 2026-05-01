const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    nombre: String,
    procesadas: Number,
    pendientes: Number,
    responsable: String
});

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
    areas: [areaSchema]
});

module.exports = mongoose.model("Product", productSchema);