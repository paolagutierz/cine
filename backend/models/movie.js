const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Acción",
      "Aventura",
      "Ciencia Ficción",
      "Fantasía",
      "Terror",
      "Drama",
      "Supenso",
      "Comedia",
      "Animacion",
    ],
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
  },
  duration: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movie", MovieSchema);
