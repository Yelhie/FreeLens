const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photographerId: { type: String, required: true, ref: "Photographer" },
  filePath: { type: String, required: true },
  likes: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
