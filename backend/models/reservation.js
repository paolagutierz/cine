const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  seatID: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("reservation", ReservationSchema);
