const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* LOGIN SIMPLE */
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
            _id: user._id,
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