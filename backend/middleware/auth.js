const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).json({
            msg: "Sin token"
        });

    }

    try {

        const verified = jwt.verify(
            token,
            "lzr_secret"
        );

        req.user = verified;

        next();

    } catch (err) {

        res.status(401).json({
            msg: "Token inválido"
        });

    }

};