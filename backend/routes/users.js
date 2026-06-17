const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* ================= CREAR USUARIO ================= */

router.post("/", async (req, res) => {

    try {

        const {
            nombre,
            usuario,
            password,
            rol,
            area
        } = req.body;

        const existe = await User.findOne({
            usuario
        });

        if (existe) {

            return res.status(400).json({
                msg: "El usuario ya existe"
            });

        }

        const user = new User({

            nombre,
            usuario,
            password,
            rol: rol || "operador",
            area: area || ""

        });

        await user.save();

        res.status(201).json({
            msg: "Usuario creado correctamente",
            usuario: user.usuario
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= OBTENER USUARIOS ================= */

router.get("/", async (req, res) => {

    try {

        const users = await User.find(
            {},
            "-password"
        );

        res.json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user = await User.findOne({

            usuario: username,
            password: password

        });

        if (!user) {

            return res.status(401).json({
                msg: "Usuario o contraseña incorrectos"
            });

        }

        res.json({

            usuario: user.usuario,
            nombre: user.nombre,
            rol: user.rol,
            area: user.area || ""

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;

