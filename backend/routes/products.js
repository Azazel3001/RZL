const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    nombre: String,

    cantidad: Number,

    color: String,

    talla: String,

    lote: String,

    foto: String,

    proceso: String,

    progreso: Number,

    responsable: String,

    ubicacionActual: String,

    estado: String,

    historial: [

        {

            proceso: String,

            estado: String,

            usuario: String,

            fecha: {

                type: Date,

                default: Date.now

            }

        }

    ]

});

module.exports =
    mongoose.model(
        "Product",
        ProductSchema
    );