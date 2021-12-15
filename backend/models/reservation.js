const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  seatId: {
    type: String,
    required: true,
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "ticket",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },
});

module.exports = mongoose.model("reservation", ReservationSchema);
