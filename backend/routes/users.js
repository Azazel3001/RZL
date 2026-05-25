const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

/* LOGIN */

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {

        return res.status(401).json({
            msg: "Usuario no existe"
        });

    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {

        return res.status(401).json({
            msg: "Contraseña incorrecta"
        });

    }

    const token = jwt.sign({

        id: user._id,
        role: user.role,
        username: user.username

    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        });

    res.json({

        token,
        user

    });

});

module.exports = router;