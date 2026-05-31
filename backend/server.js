require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

/* ================= MONGO ================= */

mongoose.connect(process.env.MONGO_URI)

  .then(() => {

    console.log("Mongo conectado");

  })

  .catch(err => {

    console.log(err);

  });

/* ================= FRONTEND ================= */

const frontendPath =
  path.join(__dirname, "../frontend");

/* STATIC FILES */

app.use(
  express.static(frontendPath)
);

/* UPLOADS */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ================= API ROUTES ================= */

app.use(
  "/api/users",
  require("./routes/users")
);

app.use(
  "/api/products",
  require("./routes/products")
);

app.use(
  "/api/maquileras",
  require("./routes/maquileras")
);

app.use(
  "/api/uploads",
  require("./routes/uploads")
);

/* ================= PAGES ================= */

/* LOGIN */

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "index.html"
    )
  );

});

/* DASHBOARD */

app.get("/dashboard", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "dashboard.html"
    )
  );

});

/* INVENTARIO */

app.get("/inventario", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "inventario.html"
    )
  );

});

/* PRODUCCION */

app.get("/produccion", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "produccion.html"
    )
  );

});

/* CORTE */

app.get("/corte", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "corte.html"
    )
  );

});

/* CONFECCION */

app.get("/confeccion", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "confeccion.html"
    )
  );

});

/* ACABADOS */

app.get("/acabados", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "acabados.html"
    )
  );

});

/* CALIDAD */

app.get("/calidad", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "calidad.html"
    )
  );

});


app.get("/maquileras", (req, res) => {

  res.sendFile(

    path.join(
      frontendPath,
      "pages",
      "maquileras.html"
    )

  );

});


/* REPORTES */

app.get("/reportes", (req, res) => {

  res.sendFile(
    path.join(
      frontendPath,
      "pages",
      "reportes.html"
    )
  );

});

/* ================= 404 ================= */

app.use((req, res) => {

  res.status(404).sendFile(
    path.join(
      frontendPath,
      "index.html"
    )
  );

});

/* ================= ERROR ================= */

app.use((err, req, res, next) => {

  console.log(err);

  res.status(500).json({

    msg: "Error servidor"

  });

});

/* ================= SERVER ================= */

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    "Servidor puerto " + PORT
  );

});