const jwt = require("jsonwebtoken");
const { dbConfig } = require("../config/dbConfig");

// Fonction pour générer un token JWT d'une durée de vie de 15 minutes
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, dbConfig.secret, {
    expiresIn: "15 minutes",
    algorithm: "HS256",
  });
};

module.exports = { generateToken };
