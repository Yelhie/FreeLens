import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { MediaModel, MediaDocument } from "../models/media.model";
import { MediaRequestBody } from "../types/express";

// Récupère les médias assosié à un photographerId
export const getMediasByPhotographerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photographerId: string = req.params.photographerId;
    const medias: MediaDocument[] = await MediaModel.find({
      photographerId: photographerId,
    });
    res.status(200).json(medias);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des médias pour ce photographe",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des médias pour ce photographe",
        error: "Erreur inconnue",
      });
    }
  }
};

// Fonction pour upload un fichier
export const uploadMedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newMedia: MediaDocument = new MediaModel({
      title: (req.body as MediaRequestBody).title,
      photographerId: (req.body as MediaRequestBody).photographerId,
      filePath: req.file ? req.file.path : null,
      likes: (req.body as MediaRequestBody).likes || 0,
      date: new Date(),
    });

    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de l'ajout du média",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Erreur lors de l'upload du média",
        error: "Erreur inconnue",
      });
    }
  }
};

// Fonction pour mettre à jour les likes et le titre d'un media via son ID
export const updateMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const media = await MediaModel.findByIdAndUpdate(
      req.params.id,
      {
        likes: (req.body as MediaRequestBody).likes,
        title: (req.body as MediaRequestBody).title,
      },
      {
        new: true,
      }
    );

    if (!media) {
      return res.status(404).json({ message: "Le fichier n'existe pas" });
    }

    return res.status(200).json(media);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erreur lors de la mise à jour du média",
      error: error.message,
    });
  }
};

//supprimer un fichier via son ID
export const deleteMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const media = await MediaModel.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Le fichier n'existe pas" });
    }

    // Vérifiez si filePath est défini et non vide
    if (media.filePath) {
      const filePath = path.join(__dirname, "..", media.filePath);

      // Suppression de l'image du système
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier:", err);
          return res.status(500).json({
            message: "Erreur lors de la suppression du fichier",
            error: err.message,
          });
        }

        return res.status(200).json({
          message: `Les données de l'image ${req.params.id} ont été supprimées de la base de données et le fichier associé a été supprimé du système.`,
        });
      });

      return res.status(200).json({
        message: `Les données de l'image ${req.params.id} ont été supprimées de la base de données et le fichier associé est en cours de suppression.`,
      });
    } else {
      return res.status(200).json({
        message: `Les données de l'image ${req.params.id} ont été supprimées de la base de données, mais aucun fichier n'a été trouvé.`,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Erreur lors de la suppression de l'image",
      error: error.message,
    });
  }
};
