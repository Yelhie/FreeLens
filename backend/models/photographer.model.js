const mongoose = require("mongoose");

const photographerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return !this.userId;
      },
    },
    avatarPath: {
      type: String,
      required: function () {
        return !this.userId;
      },
    },
    city: {
      type: String,
      required: function () {
        return !this.userId;
      },
    },
    country: {
      type: String,
      required: function () {
        return !this.userId;
      },
    },
    price: {
      type: Number,
      required: function () {
        return !this.userId;
      },
    },
    apropos: {
      type: String,
      maxlength: 230,
      required: function () {
        return !this.userId;
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { collection: "photographers" }
);

const Photographer = mongoose.model("photographer", photographerSchema);

module.exports = Photographer;
