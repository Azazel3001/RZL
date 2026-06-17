const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

/* ================= OBTENER TODOS ================= */

router.get("/", async (req, res) => {

    try {

        const productos = await Product.find()
            .sort({ fechaInicio: -1 });

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= OBTENER UNO ================= */

router.get("/:id", async (req, res) => {

    try {

        const producto =
            await Product.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= CREAR ================= */

router.post("/", async (req, res) => {

    try {

        console.log("BODY:", req.body);

        const producto = new Product(req.body);

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {

        console.log("ERROR MONGO:");
        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

});
/* ================= ACTUALIZAR ================= */

router.put("/:id", async (req, res) => {

    try {

        const producto =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= CAMBIAR PROCESO ================= */

router.put("/:id/proceso", async (req, res) => {

    try {

        const { proceso, usuario } = req.body;

        const producto =
            await Product.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        producto.progreso = Math.round(
            (producto.piezasEnviadas / producto.cantidad) * 100
        );

        switch (proceso) {

            case "Corte":
                producto.progreso = 25;
                break;

            case "Confeccion":
                producto.progreso = 50;
                break;

            case "Acabados":
                producto.progreso = 75;
                break;

            case "Calidad":
                producto.progreso = 100;
                producto.estado = "Finalizado";
                break;

        }

        producto.historial.push({

            proceso,
            estado: "Movido",
            usuario: usuario || "Sistema"

        });

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= MOVER ORDEN ================= */

router.put("/:id/mover", async (req, res) => {

    try {

        const {
            areaActual,
            usuarioResponsable,
            usuario,
            comentario
        } = req.body;

        const producto =
            await Product.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({
                msg: "Orden no encontrada"
            });

        }

        producto.areaActual =
            areaActual;

        producto.usuarioResponsable =
            usuarioResponsable;

        producto.historial.push({

            area: areaActual,

            usuario: usuario,

            accion: "Cambio de área",

            comentario: comentario || ""

        });

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= AGREGAR NOTA ================= */

router.put("/:id/nota", async (req, res) => {

    try {

        const {
            usuario,
            comentario
        } = req.body;

        const producto =
            await Product.findById(req.params.id);

        if (!producto) {

            return res.status(404).json({
                msg: "Orden no encontrada"
            });

        }

        producto.notas.push({

            usuario,
            comentario

        });

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= PIEZAS DAÑADAS ================= */

router.put("/:id/danadas", async (req, res) => {

    try {

        const {
            piezasDanadas
        } = req.body;

        const producto =
            await Product.findByIdAndUpdate(

                req.params.id,

                {
                    piezasDanadas
                },

                {
                    new: true
                }

            );

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= ESTADISTICAS ================= */

router.get("/stats/resumen", async (req, res) => {

    try {

        const total =
            await Product.countDocuments();

        const corte =
            await Product.countDocuments({
                proceso: "Corte"
            });

        const confeccion =
            await Product.countDocuments({
                proceso: "Confeccion"
            });

        const acabados =
            await Product.countDocuments({
                proceso: "Acabados"
            });

        const calidad =
            await Product.countDocuments({
                proceso: "Calidad"
            });

        res.json({
            total,
            corte,
            confeccion,
            acabados,
            calidad
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= ELIMINAR ================= */

router.delete("/:id", async (req, res) => {

    try {

        const producto = await Product.findByIdAndDelete(req.params.id);

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        res.json({
            msg: "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;