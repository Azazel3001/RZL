const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    folio: {
        type: String,
        unique: true,
        sparse: true
    },

    nombre: {
        type: String,
        required: true
    },

    cliente: {
        type: String,
        default: ""
    },

    cantidad: {
        type: Number,
        default: 0
    },

    color: {
        type: String,
        default: ""
    },

    talla: {
        type: String,
        default: ""
    },

    lote: {
        type: String,
        default: ""
    },

    foto: {
        type: String,
        default: ""
    },

    proceso: {
        type: String,
        default: "Corte"
    },

    progreso: {
        type: Number,
        default: 0
    },

    responsable: {
        type: String,
        default: ""
    },

    ubicacionActual: {
        type: String,
        default: "Corte"
    },

    estado: {
        type: String,
        default: "Pendiente"
    },

    maquilera: {
        type: String,
        default: ""
    },

    piezasEnviadas: {
        type: Number,
        default: 0
    },

    piezasRecibidas: {
        type: Number,
        default: 0
    },

    faltantes: {
        type: Number,
        default: 0
    },

    historial: [

        {

            proceso: String,

            estado: String,

            usuario: String,

            comentario: String,

            fecha: {
                type: Date,
                default: Date.now
            }

        }

    ],

    creadoPor: {
        type: String,
        default: ""
    },

    fechaInicio: {
        type: Date,
        default: Date.now
    },

    fechaEntrega: Date

},
    {
        timestamps: true
    });

module.exports = mongoose.model(
    "Product",
    ProductSchema
);