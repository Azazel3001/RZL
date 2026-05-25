require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* MONGO */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

/* STATIC */

app.use(express.static(
  path.resolve(__dirname, "../frontend")
));

/* ROUTES */

app.use("/api/users",
  require("./routes/users"));

app.use("/api/products",
  require("./routes/products"));

app.use("/uploads",
  express.static(
    path.join(__dirname, "uploads")
  ));

app.use("/api/uploads",
  require("./routes/uploads"));

/* FRONTEND */

app.get("/", (req, res) => {

  res.sendFile(
    path.resolve(__dirname,
      "../frontend/index.html")
  );

});

app.get("/dashboard", (req, res) => {

  res.sendFile(
    path.resolve(__dirname,
      "../frontend/dashboard.html")
  );

});

/* SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Servidor puerto " + PORT);

});
app.use("/api/logs",
  require("./routes/logs"));