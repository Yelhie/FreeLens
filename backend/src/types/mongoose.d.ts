import mongoose, { Document, Schema, Model } from "mongoose";

// Interface représentant un document de session dans MongoDB
interface SessionDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

// Interface représentant un document utilisateur dans MongoDB
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  _id: Types.ObjectId;
  photographerProfile: mongoose.Schema.Types.ObjectId;
  clientProfile: mongoose.Schema.Types.ObjectId;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Interface représentant un modèle d'utilisateur dans MongoDB
interface UserModel extends Model<UserDocument> {}

// Interface représentant un document photographe dans MongoDB
interface PhotographerDocument extends Document {
  name: string;
  avatarPath: string;
  city: string;
  country: string;
  price: number;
  apropos: string;
  userId: mongoose.Schema.Types.ObjectId;
}

// Interface représentant un document média dans MongoDB
interface MediaDocument extends Document {
  title: string;
  photographerId: string;
  filePath: string;
  likes: number;
  date: Date;
}

// Interface représentant un modèle de média dans MongoDB
interface MediaModel extends Model<MediaDocument> {}

// Interface représentant un document client dans MongoDB
interface ClientDocument extends Document {
  name: string;
  email: string;
}

export {
  SessionDocument,
  UserDocument,
  UserModel,
  PhotographerDocument,
  MediaDocument,
  MediaModel,
  ClientDocument,
};
