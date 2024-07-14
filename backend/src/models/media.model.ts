import mongoose, { Schema, Model } from "mongoose";
import { MediaDocument } from "../types/mongoose";

const MediaSchema: Schema<MediaDocument> = new Schema({
  title: { type: String, required: true },
  photographerId: { type: String, required: true, ref: "Photographer" },
  filePath: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const MediaModel: Model<MediaDocument> = mongoose.model<MediaDocument>(
  "Media",
  MediaSchema
);

export { MediaModel, MediaDocument };
