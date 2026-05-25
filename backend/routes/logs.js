const express = require("express");

const router = express.Router();

const Log = require("../models/Log");

router.get("/", async (req, res) => {

    const logs = await Log.find()
        .sort({ fecha: -1 });

    res.json(logs);

});

module.exports = router;