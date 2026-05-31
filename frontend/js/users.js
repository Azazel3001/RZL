const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* LOGIN */

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username
        });

        if (!user) {

            return res.status(400).json({
                msg: "Usuario no encontrado"
            });

        }

        if (user.password !== password) {

            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            "lzr_secret",
            {
                expiresIn: "7d"
            }
        );

        res.json({
            token,
            username: user.username,
            role: user.role
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;