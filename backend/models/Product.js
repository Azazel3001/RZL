const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    status: String,
});

module.exports = mongoose.model("Product", ProductSchema);