const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: Date,
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("movies", MoviesSchema);
