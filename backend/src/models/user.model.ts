import mongoose, { Schema, Model } from "mongoose";
import { UserDocument } from "../types/mongoose";
import bcrypt from "bcryptjs";

// Model de l'utilisateur avec les champs requis pour l'authentification
// et la gestion des rôles qui peuvent lui être attribués.
const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Nom d'utilisateur requis"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email requis"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Veuillez fournir une adresse email valide"],
    },
    password: {
      type: String,
      required: [true, "Mot de passe requis"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
    },
    // Rôle que l'utilisateur peut avoir : client ou photographe
    role: {
      type: String,
      required: [true, "Rôle requis"],
      enum: ["client", "photographer"],
    },
    // Détermine le shéma de la collection à utiliser pour le profil de photographe
    photographerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhotographerProfile",
    },
    // Détermine le shéma de la collection à utiliser pour le profil de client
    clientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientProfile",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Middleware pour hacher le mot de passe de l'utilisateur avant de le sauvegarder en base
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour comparer le mot de passe entré par l'utilisateur avec le mot de passe haché en base
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema
);

export { UserModel, UserDocument };
