const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

/* ================= OBTENER TODOS ================= */

router.get("/", async (req, res) => {

    try {

        const productos =
            await Product.find()
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

        const producto =
            new Product(req.body);

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {

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

        const {

            proceso,
            usuario

        } = req.body;

        const producto =
            await Product.findById(
                req.params.id
            );

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        producto.proceso = proceso;
        producto.ubicacionActual = proceso;

        if (proceso === "Corte")
            producto.progreso = 25;

        if (proceso === "Confeccion")
            producto.progreso = 50;

        if (proceso === "Acabados")
            producto.progreso = 75;

        if (proceso === "Calidad")
            producto.progreso = 100;

        producto.historial.push({

            proceso,

            estado: "Movido",

            usuario

        });

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= CHECKLIST ================= */

router.put("/:id/checklist", async (req, res) => {

    try {

        const {

            area,
            campo,
            valor

        } = req.body;

        const producto =
            await Product.findById(
                req.params.id
            );

        if (!producto) {

            return res.status(404).json({
                msg: "Producto no encontrado"
            });

        }

        producto[area][campo] = valor;

        await producto.save();

        res.json(producto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= ELIMINAR ================= */

router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.json({
            msg: "Producto eliminado"
        });

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

module.exports = router;