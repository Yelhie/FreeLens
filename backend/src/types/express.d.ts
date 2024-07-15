import { UserDocument } from "./models/user.model";
import { MediaDocument } from "./models/media.model";

interface UserRequestBody {
  name: string;
  avatarPath: string;
  city: string;
  country: string;
  apropos: string;
  username: string;
  email: string;
  password: string;
  role: "Photographer" | "Client" | "Admin";
}

interface PhotographerRequestBody extends UserBase {
  role: "Photographer";
  price: number;
  userId: mongoose.Schema.Types.ObjectId;
}

interface ClientRequestBody extends UserBase {
  role: "Client";
  userId: mongoose.Schema.Types.ObjectId;
  // Pas de propriété spécifique pour client pour le moment
}

interface AdminRequestBody extends UserBase {
  role: "Admin";
  userId: mongoose.Schema.Types.ObjectId;
  // Pas de propriété spécifique pour l'admin pour le moment
}

interface MediaRequestBody {
  title: string;
  photographerId: string;
  filePath: string;
  likes: number;
  date: Date;
}

declare module "express" {
  export interface Request {
    user?: UserDocument;
    media?: MediaDocument;
    body:
      | UserRequestBody
      | MediaRequestBody
      | PhotographerRequestBody
      | ClientRequestBody
      | AdminRequestBody;
  }
}
