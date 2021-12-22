const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  sort: {
    type: String,
    enum: ["normal", "premium"],
    default: "normal",
  },
  price: {
    type: String,
  },
});

module.exports = mongoose.model("cinema", CinemaSchema);
