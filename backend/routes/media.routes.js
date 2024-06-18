const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {
  uploadMedia,
  getMediasByPhotographerId,
  deleteMedia,
  updateMedia,
} = require("../controllers/media.controller");

// Route pour récupérer les médias par photographerId
router.get("/:photographerId", getMediasByPhotographerId);

// Route pour upload un fichier media
router.post("/", upload.single("filePath"), uploadMedia);

// Route pour mettre à jour un fichier media via son ID
router.patch("/:id", updateMedia);

// Route pour supprimer un fichier media via son ID
router.delete("/:id", deleteMedia);

module.exports = router;
