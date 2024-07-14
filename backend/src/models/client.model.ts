import mongoose, { Schema, Model } from "mongoose";
import { ClientDocument } from "../types/mongoose";

//*****/ FICHIER TEMPORAIRE /*****/
//*****/ A MODIFIER /*****/

const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>(
  "Client",
  ClientSchema
);

export { ClientModel, ClientDocument };
