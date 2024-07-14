import jwt, { SignOptions } from "jsonwebtoken";
import { dbConfig } from "../config/dbConfig";

// Fonction pour générer un token JWT d'une durée de vie de 15 minutes
const generateToken = (userId: string): string => {
  const payload = { id: userId };
  const options: SignOptions = {
    expiresIn: "15m",
    algorithm: "HS256",
  };

  return jwt.sign(payload, dbConfig.secret!, options);
};
export { generateToken };
