const mongoose = require("mongoose");
const cinema = require("./cinema");
const Schema = mongoose.Schema;

const SeatSchema = new mongoose.Schema({
  cinema: {
    type: Schema.ObjectId,
    ref: "cinema",
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("seat", SeatSchema);
