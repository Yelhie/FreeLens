import mongoose, { Schema, Model } from "mongoose";
import { SessionDocument } from "../types/mongoose";

// Définition du schéma de session dans MongoDB
const SessionSchema: Schema<SessionDocument> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // L'ID de l'utilisateur est un objet ID de MongoDB
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { collection: "sessions" }
);

// Index pour l'expiration automatique des sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const SessionModel: Model<SessionDocument> = mongoose.model<SessionDocument>(
  "Session",
  SessionSchema
);

export { SessionModel, SessionDocument };
