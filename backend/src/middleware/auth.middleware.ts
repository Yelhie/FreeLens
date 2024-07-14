import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { verifySession } from "../controllers/session.controller";
import { dbConfig } from "../config/dbConfig";

// Middleware pour protéger les routes nécessitant une authentification
// Vérifier si l'utilisateur est connecté en vérifiant le token JWT dans l'en-tête de la requête
// Si l'utilisateur est connecté, ajoute l'utilisateur à req.user pour les prochaines étapes de la requête de l'utilisateur
// Sinon, renvoyer un message d'erreur approprié
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    // Vérifier si l'en-tête Authorization existe dans la requête de l'utilisateur et commence par "Bearer"
    // Ensuite, extraire le token JWT de l'en-tête Authorization et le stocke dans la variable token
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      await verifySession(token);
      if (!dbConfig.secret) {
        throw new Error("Secret JWT non défini dans la configuration");
      }
      const decoded = jwt.verify(token, dbConfig.secret) as { id: string };
      const user = await UserModel.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Non autorisé, utilisateur introuvable" });
      }
      req.user = user;
      // Passe au middleware suivant ou à la fonction de routage suivante
      next();
    } catch (error) {
      if (error instanceof Error) {
        // Gérer les erreurs de décodage du token et retourner un message d'erreur approprié
        if (error.name === "JsonWebTokenError") {
          res.status(401).json({ message: "Non autorisé, token invalide" });
        } else if (error.name === "TokenExpiredError") {
          res.status(401).json({ message: "Non autorisé, token expiré" });
        } else {
          res.status(401).json({ message: "Non autorisé, token échoué" });
        }
      } else {
        res.status(500).json({ message: "Erreur serveur inconnue" });
      }
    }
  } else {
    res.status(401).json({ message: "Non autorisé, aucun token" });
  }
};

export { protect };
