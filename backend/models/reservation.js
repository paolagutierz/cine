const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieShow = require("./movieShow");

const ReservationSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  movieShow: {
    type: Schema.ObjectId,
    ref: "movieShow",
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["canceled", "pending", "expired"],
    default: "pending",
  },
});

module.exports = mongoose.model("reservation", ReservationSchema);
