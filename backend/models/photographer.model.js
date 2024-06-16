const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarPath: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "photographers" }
);

const Photographer = mongoose.model("photographer", photographerSchema);

module.exports = Photographer;
