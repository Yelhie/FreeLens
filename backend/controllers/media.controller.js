const fs = require("fs");
const path = require("path");
const MediaModel = require("../models/media.model");

// Récupère les médias assosié à un photographerId
module.exports.getMediasByPhotographerId = async (req, res) => {
  try {
    const photographerId = req.params.photographerId;
    const medias = await MediaModel.find({ photographerId: photographerId });
    res.status(200).json(medias);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des médias pour ce photographe",
      error: error.message,
    });
  }
};

// Fonction pour upload un fichier
module.exports.uploadMedia = async (req, res) => {
  try {
    const newMedia = new MediaModel({
      title: req.body.title,
      photographerId: req.body.photographerId,
      filePath: req.file ? req.file.path : null,
      likes: req.body.likes || 0,
      date: new Date(),
    });

    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du média",
      error: error.message,
    });
  }
};

// Fonction pour mettre à jour les likes et le titre d'un media via son ID
module.exports.updateMedia = async (req, res) => {
  try {
    const media = await MediaModel.findByIdAndUpdate(
      req.params.id,
      {
        likes: req.body.likes,
        title: req.body.title,
      },
      {
        new: true,
      }
    );

    if (!media) {
      return res.status(404).json({ message: "Le fichier n'existe pas" });
    }

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du média",
      error: error.message,
    });
  }
};

//supprimer un fichier via son ID
module.exports.deleteMedia = async (req, res) => {
  try {
    const media = await MediaModel.findByIdAndDelete(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Le fichier n'existe pas" });
    }

    // Vérifiez si filePath est défini et non vide
    if (media.filePath) {
      // Chemin de l'image à supprimer
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

        res.status(200).json({
          message: `Les données de l'image ${req.params.id} ont été supprimées de la base de données et le fichier associé a été supprimé du système.`,
        });
      });
    } else {
      res.status(200).json({
        message: `Les données de l'image ${req.params.id} ont été supprimées de la base de données, mais aucun fichier n'a été trouvé.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'image",
      error: error.message,
    });
  }
};
