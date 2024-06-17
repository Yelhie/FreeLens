const express = require("express");
const { dbConnection } = require("./config/dbConfig.js");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

dbConnection();

// Middleware pour analyser le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(cors());

// Routes
app.use("/api/", require("./routes/index.routes"));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port : ${port}`);
});
