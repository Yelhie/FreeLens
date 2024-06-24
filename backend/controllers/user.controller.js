const UserModel = require("../models/user.model");
const PhotographerModel = require("../models/photographer.model");
const { createSession } = require("./session.controller");
const { generateToken } = require("../utils/jwt.utils");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  // Vérifis si tous les champs requis sont présents
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  // Vérifie si l'utilisateur existe déjà dans la base de données
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Ce nom d'utilisateur ou cette adresse mail est déjà utilisé",
      });
    }
    // Créez un nouvel utilisateur en base en utilisant le modèle UserModel
    const user = new UserModel({ username, email, password, role });
    await user.save();

    // Appel de la fonction generateToken pour générer un token JWT
    const token = generateToken(user._id);

    // Appel de la fonction createSession qui crée une session en base
    // pour l'utilisateur et y stocke un token expirant au bout de 15 minutes
    await createSession(user._id);

    // Vérifie si l'utilisateur à choisi le rôle client ou photographe et crée un profil
    // client ou photographe en base et le lie à l'utilisateur
    if (role === "photographer") {
      const photographer = new PhotographerModel({
        userId: user._id,
      });
      await photographer.save();
    } else if (role === "client") {
      const client = new ClientModel({
        userId: user._id,
      });
      await client.save();
    }

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la tentative d'enregistrement de l'utilisateur",
      error: error.message,
    });
  }
};

// Fonction pour connecter un utilisateur existant
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // Capture le retour de createSession dans une variable session
    const session = await createSession(user._id);

    res.json({ user, token: session.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
