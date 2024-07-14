import mongoose, { Schema, Model } from "mongoose";
import { PhotographerDocument } from "../types/mongoose";

// Définition du schéma de photographe dans MongoDB
const PhotographerSchema: Schema<PhotographerDocument> = new Schema(
  {
    name: {
      type: String,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    avatarPath: {
      type: String,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    city: {
      type: String,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    country: {
      type: String,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    price: {
      type: Number,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    apropos: {
      type: String,
      maxlength: 230,
      required: function (this: PhotographerDocument) {
        return !this.userId;
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { collection: "photographers" }
);

const PhotographerModel: Model<PhotographerDocument> =
  mongoose.model<PhotographerDocument>("Photographer", PhotographerSchema);

export { PhotographerModel, PhotographerDocument };
