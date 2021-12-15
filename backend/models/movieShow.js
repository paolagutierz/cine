const mongoose = require("mongoose");

const MovieShowSchema = new mongoose.Schema({
  id: {
    type: string,
  },
  date: {
    type: Date,
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
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },
  seatAvailable: {
    type: [Schema.Types.Mixed],
    ref: "seat",
    required: true,
  },
  ticketPrice: {
    type: string,
    required: true,
  },
});

module.exports = mongoose.model("movieShow", MovieShowSchema);
