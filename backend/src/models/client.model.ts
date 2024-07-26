import mongoose, { Schema, Model } from "mongoose";
import { ClientDocument } from "../types/mongoose";

// Définition du schéma de client dans MongoDB
const ClientSchema: Schema<ClientDocument> = new Schema(
  {
    name: {
      type: String,
      required: function (this: ClientDocument) {
        return !this.userId;
      },
    },
    city: {
      type: String,
      required: function (this: ClientDocument) {
        return !this.userId;
      },
    },
    country: {
      type: String,
      required: function (this: ClientDocument) {
        return !this.userId;
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { collection: "clients" }
);

const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>(
  "Client",
  ClientSchema
);

export { ClientModel, ClientDocument };
