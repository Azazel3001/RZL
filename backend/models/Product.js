const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    /* DATOS GENERALES */

    folio: {
        type: String,
        default: ""
    },

    cliente: {
        type: String,
        required: true
    },

    modelo: {
        type: String,
        default: ""
    },

    producto: {
        type: String,
        required: true
    },

    talla: {
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

    lote: {
        type: String,
        default: ""
    },

    foto: {
        type: String,
        default: ""
    },

    /* RESPONSABLE ACTUAL */

    usuarioResponsable: {
        type: String,
        default: ""
    },

    areaActual: {
        type: String,
        default: "Diseño"
    },

    estado: {
        type: String,
        default: "Pendiente"
    },

    progreso: {
        type: Number,
        default: 0
    },

    /* PRIORIDAD */

    urgente: {
        type: Boolean,
        default: false
    },

    /* CONTROL DE PRODUCCIÓN */

    piezasDanadas: {
        type: Number,
        default: 0
    },

    piezasBuenas: {
        type: Number,
        default: 0
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

    /* OBSERVACIONES */

    observaciones: {
        type: String,
        default: ""
    },

    notas: [

        {

            usuario: String,

            comentario: String,

            fecha: {
                type: Date,
                default: Date.now
            }

        }

    ],

    /* HISTORIAL */

    historial: [

        {

            area: String,

            usuario: String,

            accion: String,

            comentario: String,

            fecha: {
                type: Date,
                default: Date.now
            }

        }

    ],

    /* FECHAS */

    creadoPor: {
        type: String,
        default: ""
    },

    fechaInicio: {
        type: Date,
        default: Date.now
    },

    fechaEntrega: {
        type: Date
    }

},
    {
        timestamps: true
    });

module.exports = mongoose.model(
    "Product",
    ProductSchema
);