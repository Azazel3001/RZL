const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    // DATOS GENERALES

    folio: {
        type: String,
        unique: true
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
        required: true
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

    // PRODUCCIÓN

    proceso: {
        type: String,
        default: "Corte"
    },

    estado: {
        type: String,
        default: "Pendiente"
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

    // CHECKLIST CORTE

    corte: {

        telaRecibida: {
            type: Boolean,
            default: false
        },

        telaRevisada: {
            type: Boolean,
            default: false
        },

        moldeCargado: {
            type: Boolean,
            default: false
        },

        corteRealizado: {
            type: Boolean,
            default: false
        }

    },

    // CHECKLIST CONFECCIÓN

    confeccion: {

        recibido: {
            type: Boolean,
            default: false
        },

        frontal: {
            type: Boolean,
            default: false
        },

        trasera: {
            type: Boolean,
            default: false
        },

        mangas: {
            type: Boolean,
            default: false
        },

        etiquetas: {
            type: Boolean,
            default: false
        }

    },

    // CHECKLIST ACABADOS

    acabados: {

        limpieza: {
            type: Boolean,
            default: false
        },

        planchado: {
            type: Boolean,
            default: false
        },

        empaque: {
            type: Boolean,
            default: false
        }

    },

    // CHECKLIST CALIDAD

    calidad: {

        revision: {
            type: Boolean,
            default: false
        },

        conteo: {
            type: Boolean,
            default: false
        },

        aprobado: {
            type: Boolean,
            default: false
        }

    },

    // HISTORIAL

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
        type: String
    },

    fechaInicio: {
        type: Date,
        default: Date.now
    },

    fechaEntrega: {
        type: Date
    }

});

module.exports =
    mongoose.model(
        "Product",
        ProductSchema
    );