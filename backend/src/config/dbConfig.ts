import dotenv from "dotenv";
import mongoose from "mongoose";
import { DBConfig } from "../types/dbConfig";

dotenv.config();

// Exportation de la configuration de la base de données
const dbConfig: DBConfig = {
  db: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET,
};

// Connexion à la base de données MongoDB
export async function dbConnection(): Promise<void> {
  if (!dbConfig.db) {
    throw new Error("L'URL de la base de données n'est pas définie");
  }

  try {
    await mongoose.connect(dbConfig.db!);
    console.log("Base de données connectée avec succès");
  } catch (error) {
    console.error(`Erreur de connection à la base de données: ${error}`);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// Gestion des erreurs de connexion à la base de données
mongoose.connection.on("error", (err) => {
  console.error(err);
});

export { dbConfig };
