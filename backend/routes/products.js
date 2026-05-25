const express = require("express");

const router = express.Router();

const Product = require("../models/Product");
const Log = require("../models/Log");

const auth = require("../middleware/auth");

/* GET */

router.get("/", auth, async (req, res) => {

    const products = await Product.find();

    res.json(products);

});

/* CREATE */

router.post("/", auth, async (req, res) => {

    const product = new Product({

        ...req.body,

        creadoPor: req.user.username

    });

    await product.save();

    await Log.create({

        usuario: req.user.username,

        accion: `Agregó producto ${product.nombre}`

    });

    res.json(product);

});

/* DELETE */

router.delete("/:id", auth, async (req, res) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            msg: "No autorizado"
        });

    }

    await Product.findByIdAndDelete(req.params.id);

    await Log.create({

        usuario: req.user.username,

        accion: "Eliminó producto"

    });

    res.json({
        msg: "Producto eliminado"
    });

});

module.exports = router;