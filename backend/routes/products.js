const mongoose = require("mongoose");

const ProductSchema =
    new mongoose.Schema({

        nombre: String,

        descripcion: String,

        foto: String,

        cantidad: Number,

        etapa: String,

        maquilera: String,

        progreso: Number,

        historial: [

            {

                etapa: String,

                usuario: String,

                fecha: {
                    type: Date,
                    default: Date.now
                },

                notas: String

            }

        ]

    });

module.exports =
    mongoose.model(
        "Product",
        ProductSchema
    );