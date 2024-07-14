import { SessionModel, SessionDocument } from "../models/session.model";
import { generateToken } from "../utils/jwt.utils";

// Cette fonction créer une session en base en générant un
// token JWT d'une durée de vie de 15 minute pour un utilisateur donné
const createSession = async (userId: string): Promise<SessionDocument> => {
  try {
    // Appel de la fonction generateToken pour générer un token JWT
    const token = generateToken(userId);
    // Crée une nouvelle session en base pour l'utilisateur avec
    // le token généré et une date d'expiration
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const session = new SessionModel({
      userId,
      token,
      expiresAt,
    });
    await session.save();
    return session;
  } catch (error) {
    if (error instanceof Error) {
      // Gestion des erreurs liées à la base de données ou à JWT
      throw new Error(
        "Erreur lors de la création de la session : " + error.message
      );
    } else {
      throw new Error(
        "Erreur lors de la création de la session : Erreur inconnue"
      );
    }
  }
};

// Vérifie la validité d'une session en vérifiant si le token est présent en base et n'a pas expiré
const verifySession = async (
  token: string
): Promise<SessionDocument | null> => {
  try {
    const session = await SessionModel.findOne({ token });
    if (!session || session.expiresAt.getTime() < Date.now()) {
      throw new Error("Session expirée ou invalide");
    }
    return session;
  } catch (error) {
    if (error instanceof Error) {
      // Gestion des erreurs liées à la base de données ou à la logique de vérification
      throw new Error(
        "Erreur lors de la vérification de la session : " + error.message
      );
    } else {
      throw new Error(
        "Erreur lors de la vérification de la session : Erreur inconnue"
      );
    }
  }
};

export { createSession, verifySession };
