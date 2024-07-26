import { Request, Response } from "express";
import { ClientModel } from "../models/client.model";
import { UserRequestBody } from "../types/express";

// Récupère tous les profils de clients (page principal)
export const getAllClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clients = await ClientModel.find().lean();
    res.status(200).json(clients);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des profils des clients",
        error: error.message,
      });
    }
  }
};

// Récupère les infos d'un compte client via ID
export const getClientByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await ClientModel.findById(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des informations du client",
        error: error.message,
      });
    }
  }
};

// Crée un compte client
export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newClient = await ClientModel.create({
      name: (req.body as UserRequestBody).name,
      avatarPath: req.file ? req.file.path : null,
      city: (req.body as UserRequestBody).city,
      country: (req.body as UserRequestBody).country,
    });
    res.status(201).json(newClient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la création du compte client",
        error: error.message,
      });
    }
  }
};

/// Met à jour les informations d'un compte client
export const updateClientByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedClient = await ClientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedClient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour des informations du client",
        error: error.message,
      });
    }
  }
};

// Supprime un compte client
export const deleteClientByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);

    if (!client) {
      res.status(404).json({
        message: "Aucun compte client trouvé avec cet ID",
      });
      return;
    }

    res.status(200).json({
      message: `Le profil client ${req.params.id} a été supprimé de la base de données.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du profil de photographe",
        error: error.message,
      });
    }
  }
};
