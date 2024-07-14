import { Request, Response } from "express";
import { generateToken } from "../utils/jwt.utils";
import { createSession } from "./session.controller";
import { UserModel } from "../models/user.model";
import { PhotographerModel } from "../models/photographer.model";
import { ClientModel } from "../models/client.model";
import { UserRequestBody } from "../types/express";

// Fonction pour valider le mot de passe de l'utilisateur lors de l'enregistrement
// en utilisant une expression régulière pour vérifier si le mot de passe est assez fort
const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body as UserRequestBody;
  // Vérifis si tous les champs requis sont présents
  if (!username || !email || !password || !role) {
    res.status(400).json({ message: "Veuillez remplir tous les champs" });
    return;
  }

  // Vérifie si le mot de passe est assez fort selon la fonction validatePassword
  if (!validatePassword(password)) {
    res.status(400).json({
      message:
        "Le mot de passe n'est pas assez fort. Il doit comporter au moins 8 caractères dont un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial.",
    });
    return;
  }

  // Vérifie si l'utilisateur existe déjà dans la base de données
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400).json({
        message: "Ce nom d'utilisateur ou cette adresse mail est déjà utilisé",
      });
      return;
    }
    // Créez un nouvel utilisateur en base en utilisant le modèle UserModel
    const user = new UserModel({ username, email, password, role });
    await user.save();

    // Vérifiez que l'ID de l'utilisateur est bien de type string
    const userId = user._id.toString();

    // Appel de la fonction generateToken pour générer un token JWT
    const token = generateToken(userId);

    // Appel de la fonction createSession qui crée une session en base
    // pour l'utilisateur et y stocke un token expirant au bout de 15 minutes
    await createSession(userId);

    // Vérifie si l'utilisateur à choisi le rôle client ou photographe et crée un profil
    // client ou photographe en base et le lie à l'utilisateur
    if (role === "Photographer") {
      const photographer = new PhotographerModel({
        userId: user._id,
      });
      await photographer.save();
    } else if (role === "Client") {
      const client = new ClientModel({
        userId: user._id,
      });
      await client.save();
    }

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la tentative d'enregistrement de l'utilisateur",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message:
          "Une erreur inconnue s'est produite lors de la tentative d'enregistrement de l'utilisateur",
      });
    }
  }
};

// Fonction pour connecter un utilisateur existant
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as UserRequestBody;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ message: "Email ou mot de passe invalide" });
      return;
    }

    // Capture le retour de createSession dans une variable session
    const session = await createSession(user._id.toString());

    res.json({ user, token: session.token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur inconnue s'est produite" });
    }
  }
};

export { registerUser, loginUser };
