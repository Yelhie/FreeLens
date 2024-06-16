const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const { addPhotographer } = require("../controllers/photographer.controller");

// Route pour ajouter un photographe
router.post("/", upload.single("avatarPath"), addPhotographer);

module.exports = router;
