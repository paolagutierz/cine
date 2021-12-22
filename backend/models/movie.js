const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  format: {
    type: String,
    enum: ["2D", "3D"],
    required: true,
    default: "2D",
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movie", MovieSchema);
