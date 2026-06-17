const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* ================= CREAR USUARIO ================= */

router.post("/", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/* ================= OBTENER USUARIOS ================= */

router.get("/", async (req, res) => {

    try {

        const users = await User.find();

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

        const { username, password } = req.body;

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
            area: user.area
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;