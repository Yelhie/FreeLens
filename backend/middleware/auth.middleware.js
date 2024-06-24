const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { verifySession } = require("../models/session.model");
const config = require("../config/config");

// Middleware pour protéger les routes nécessitant une authentification
// Vérifier si l'utilisateur est connecté en vérifiant le token JWT dans l'en-tête de la requête
// Si l'utilisateur est connecté, ajoute l'utilisateur à req.user pour les prochaines étapes de la requête de l'utilisateur
// Sinon, renvoyer un message d'erreur approprié
const protect = async (req, res, next) => {
  let token;
  if (
    // Vérifier si l'en-tête Authorization existe dans la requête de l'utilisateur et commence par "Bearer"
    // Ensuite, extraire le token JWT de l'en-tête Authorization et le stocke dans la variable token
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // Appel la fonction verifySession pour vérifier si le token est présent et valide dans la collection sessions
      await verifySession(token);
      const decoded = jwt.verify(token, config.secret);
      // Recherche l'utilisateur par son id dans la base de donnée, décode l'id du token JWT et exclut le mot de passe de l'utilisateur
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Non autorisé, utilisateur introuvable" });
      }
      req.user = user;
      // Passe au middleware suivant ou à la fonction de routage suivante
      next();
    } catch (error) {
      // Gérer les erreurs de décodage du token et retourner un message d'erreur approprié
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Non autorisé, token invalide" });
      } else if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Non autorisé, token expiré" });
      } else {
        res.status(401).json({ message: "Non autorisé, token échoué" });
      }
    }
  } else {
    res.status(401).json({ message: "Non autorisé, aucun token" });
  }
};

module.exports = { protect };
