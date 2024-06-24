const mongoose = require("mongoose");
require("dotenv").config();

// Exportation de la configuration de la base de données
const dbConfig = {
  db: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET,
};

// Connexion à la base de données MongoDB
async function dbConnection() {
  try {
    await mongoose.connect(dbConfig.db);
    console.log("Base de données connectée avec succès");
  } catch (error) {
    console.error(`Erreur de connection à la base de données: ${error}`);
    throw new Error(error);
  }
}

// Gestion des erreurs de connexion à la base de données
mongoose.connection.on("error", (err) => {
  console.error(err);
});

module.exports = { dbConfig, dbConnection };
