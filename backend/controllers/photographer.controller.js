const fs = require("fs");
const path = require("path");
const PhotographeModel = require("../models/photographer.model");

// Récupère tous les profils de photographes (page principal)
module.exports.getAllPhotographers = async (req, res) => {
  try {
    const photographes = await PhotographeModel.find();
    res.status(200).json(photographes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des profils des photographes",
      error: error.message,
    });
  }
};

// Récupère les infos d'un photographe (profil)
module.exports.getPhotographer = async (req, res) => {
  try {
    const photographes = await PhotographeModel.findById(req.params.id);
    res.status(200).json(photographes);
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
    const newPhotographes = await PhotographeModel.create({
      name: req.body.name,
      avatarPath: req.file ? req.file.path : null,
      city: req.body.city,
      country: req.body.country,
      price: req.body.price,
    });
    res.status(200).json(newPhotographes);
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
    const photographes = await PhotographeModel.findById(req.params.id);

    if (!photographes) {
      return res.status(404).json({ message: "Le profil n'existe pas" });
    }

    const updatePhotographe = await PhotographeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatePhotographe);
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
    const photographe = await PhotographeModel.findById(req.params.id);

    if (!photographe) {
      return res.status(404).json({ message: "Le profil n'existe pas" });
    }

    // Vérifiez si avatarPath est défini et non vide
    if (photographe.avatarPath) {
      // Chemin de l'image à supprimer
      const avatarPath = path.join(__dirname, "..", photographe.avatarPath);

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
          await PhotographeModel.deleteOne({ _id: req.params.id });
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
      await PhotographeModel.deleteOne({ _id: req.params.id });
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
