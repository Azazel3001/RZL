const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/* STORAGE */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "backend/uploads");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );

    }

});

const upload = multer({ storage });

/* ROUTE */

router.post("/",
    upload.single("image"),
    (req, res) => {

        res.json({

            image:
                `/uploads/${req.file.filename}`

        });

    });

module.exports = router;