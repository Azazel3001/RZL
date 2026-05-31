const express = require("express");
const router = express.Router();

const Maquilera = require("../models/Maquilera");

/* OBTENER TODAS */

router.get("/", async (req, res) => {

    try {

        const maquileras =
            await Maquilera.find()
                .sort({ nombre: 1 });

        res.json(maquileras);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* CREAR */

router.post("/", async (req, res) => {

    try {

        const maquilera =
            new Maquilera(req.body);

        await maquilera.save();

        res.status(201).json(maquilera);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ELIMINAR */

router.delete("/:id", async (req, res) => {

    try {

        await Maquilera.findByIdAndDelete(
            req.params.id
        );

        res.json({
            msg: "Maquilera eliminada"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;