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
}

interface ClientRequestBody extends UserBase {
  role: "Client";
  // Pas de propriété spécifique pour client pour le moment
}

interface AdminRequestBody extends UserBase {
  role: "Admin";
  // Pas de propriété spécifique pour l'admin pour le moment
}

interface MediaRequestBody {
  title: string;
  photographerId: string;
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
