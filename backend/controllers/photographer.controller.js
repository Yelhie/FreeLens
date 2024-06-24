const fs = require("fs");
const path = require("path");
const PhotographerModel = require("../models/photographer.model");

// Récupère tous les profils de photographes (page principal)
module.exports.getAllPhotographers = async (req, res) => {
  try {
    const photographers = await PhotographerModel.find();
    res.status(200).json(photographers);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des profils des photographes",
      error: error.message,
    });
  }
};

// Récupère tous les profils de photographes dont les informations sont valides
module.exports.getAllValidPhotographers = async (req, res) => {
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
    res.status(500).json({
      message:
        "Erreur lors de la récupération des profils photographes valdies",
      error: error,
    });
  }
};

// Récupère les infos d'un compte photographe via ID
module.exports.getPhotographer = async (req, res) => {
  try {
    const photographer = await PhotographerModel.findById(req.params.id);
    res.status(200).json(photographer);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des informations du photographe",
      error: error.message,
    });
  }
};

//Ajoute un profil de photographe
module.exports.addPhotographer = async (req, res) => {
  try {
    const newPhotographer = await PhotographerModel.create({
      name: req.body.name,
      avatarPath: req.file ? req.file.path : null,
      city: req.body.city,
      country: req.body.country,
      price: req.body.price,
      apropos: req.body.apropos,
    });
    res.status(200).json(newPhotographer);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout d'un nouveau profil de photographe'",
      error: error.message,
    });
  }
};

//Modifie un profil de photographe via son ID
module.exports.editPhotographer = async (req, res) => {
  const { apropos } = req.body;

  if (apropos && apropos.length > 230) {
    return res.status(400).json({
      message:
        "Le champ 'à propos' ne peut pas contenir plus de 230 caractères.",
    });
  }

  try {
    const photographer = await PhotographerModel.findById(req.params.id);

    if (!photographer) {
      return res.status(404).json({ message: "Le profil n'existe pas" });
    }

    const updatePhotographer = await PhotographerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatePhotographer);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

//supprimer un profil de photographe via son ID
module.exports.deletePhotographer = async (req, res) => {
  try {
    const photographer = await PhotographerModel.findById(req.params.id);

    if (!photographer) {
      return res.status(404).json({ message: "Le profil n'existe pas" });
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
          res.status(500).json({
            message:
              "Erreur lors de la suppression du profil dans la base de données",
            error: dbError.message,
          });
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
    res.status(500).json({
      message: "Erreur lors de la suppression du profil",
      error: error.message,
    });
  }
};
