const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* LOGIN */

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user =
            await User.findOne({ username });

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

module.exports = router;