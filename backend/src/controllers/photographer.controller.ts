import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";
import { PhotographerModel } from "../models/photographer.model";
import { UserRequestBody, PhotographerRequestBody } from "../types/express";

// Récupère tous les profils de photographes (page principal)
export const getAllPhotographers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photographers = await PhotographerModel.find().lean();
    res.status(200).json(photographers);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des profils des photographes",
        error: error.message,
      });
    }
  }
};

// Récupère tous les profils de photographes dont les informations sont valides
export const getAllValidPhotographers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photographers = await PhotographerModel.find({
      name: { $exists: true, $ne: "" },
      avatarPath: { $exists: true, $ne: "" },
      city: { $exists: true, $ne: "" },
      country: { $exists: true, $ne: "" },
      price: { $exists: true, $ne: "" },
      apropos: { $exists: true, $ne: "" },
    });
    res.json(photographers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des profils photographes valdies",
        error: error,
      });
      return;
    }
  }
};

// Récupère les infos d'un compte photographe via ID
export const getPhotographer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photographer = await PhotographerModel.findById(req.params.id);
    res.status(200).json(photographer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des informations du photographe",
        error: error.message,
      });
    }
  }
};

//Ajoute un profil de photographe
export const addPhotographer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newPhotographer = await PhotographerModel.create({
      name: (req.body as UserRequestBody).name,
      avatarPath: req.file ? req.file.path : null,
      city: (req.body as UserRequestBody).city,
      country: (req.body as UserRequestBody).country,
      price: (req.body as PhotographerRequestBody).price,
      apropos: (req.body as UserRequestBody).apropos,
    });
    res.status(200).json(newPhotographer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout d'un nouveau profil de photographe'",
        error: error.message,
      });
    }
  }
};

//Modifie un profil de photographe via son ID
export const editPhotographer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { apropos } = req.body as UserRequestBody;

  if (apropos && apropos.length > 230) {
    res.status(400).json({
      message:
        "Le champ 'à propos' ne peut pas contenir plus de 230 caractères.",
    });
  }

  try {
    const photographer = await PhotographerModel.findById(req.params.id);

    if (!photographer) {
      res.status(404).json({ message: "Le profil n'existe pas" });
      return;
    }

    const updatePhotographer = await PhotographerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatePhotographer);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du profil",
        error: error.message,
      });
    }
  }
};

//supprimer un profil de photographe via son ID
export const deletePhotographer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photographer = await PhotographerModel.findById(req.params.id);

    if (!photographer) {
      res.status(404).json({ message: "Le profil n'existe pas" });
      return;
    }

    // Vérifiez si avatarPath est défini et non vide
    if (photographer.avatarPath) {
      // Chemin de l'image à supprimer
      const avatarPath = path.join(__dirname, "..", photographer.avatarPath);

      // Suppression de l'image du système
      fs.unlink(avatarPath, async (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier:", err);
          return res.status(500).json({
            message: "Erreur lors de la suppression de l'image d'avatar",
            error: err.message,
          });
        }

        // Suppression du profil de la base de données
        try {
          await PhotographerModel.deleteOne({ _id: req.params.id });
          res.status(200).json({
            message: `Le profil de photographe ${req.params.id} a été supprimé de la base de données et l'image d'avatar associée à ce dernier a été supprimée du système.`,
          });
        } catch (dbError) {
          if (dbError instanceof Error) {
            res.status(500).json({
              message:
                "Erreur lors de la suppression du profil dans la base de données",
              error: dbError.message,
            });
          }
        }
      });
    } else {
      // Si avatarPath n'est pas défini, supprime le profil sans tenter de supprimer le fichier avatar
      await PhotographerModel.deleteOne({ _id: req.params.id });
      res.status(200).json({
        message: `Le profil ${req.params.id} a été supprimé, mais aucune image d'avatar qui lui était associée n'a été trouvée.`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du profil de photographe",
        error: error.message,
      });
    }
  }
};
