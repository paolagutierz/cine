const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNum: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
});
module.exports = mongoose.model("seat", SeatSchema);
