const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ================= CREAR USUARIO ================= */

router.post("/register", async (req, res) => {

    try {

        const {
            username,
            password,
            role
        } = req.body;

        const existe =
            await User.findOne({
                username
            });

        if (existe) {

            return res.status(400).json({
                msg: "El usuario ya existe"
            });

        }

        const salt =
            await bcrypt.genSalt(10);

        const hash =
            await bcrypt.hash(
                password,
                salt
            );

        const nuevoUsuario =
            new User({

                username,

                password: hash,

                role: role || "user"

            });

        await nuevoUsuario.save();

        res.json({
            msg: "Usuario creado"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            msg: "Error servidor"
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

        const user =
            await User.findOne({
                username
            });

        if (!user) {

            return res.status(401).json({
                msg: "Usuario no encontrado"
            });

        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {

            return res.status(401).json({
                msg: "Contraseña incorrecta"
            });

        }

        const token =
            jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                "lzr_secret",

                {
                    expiresIn: "7d"
                }

            );

        res.json({

            token,

            user: {

                id: user._id,
                username: user.username,
                role: user.role

            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            msg: "Error servidor"
        });

    }

});

/* ================= LISTAR USUARIOS ================= */

router.get("/", async (req, res) => {

    try {

        const usuarios =
            await User.find()
                .select("-password");

        res.json(usuarios);

    } catch (err) {

        res.status(500).json({
            msg: "Error servidor"
        });

    }

});

module.exports = router;