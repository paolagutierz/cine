const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movie = require("./movie");
const cinema = require("./cinema");

const MovieShowSchema = new mongoose.Schema({
  movie: {
    type: Schema.ObjectId,
    ref: "movie",
    required: true,
  },
  cinema: {
    type: Schema.ObjectId,
    ref: "cinema",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movieShow", MovieShowSchema);
