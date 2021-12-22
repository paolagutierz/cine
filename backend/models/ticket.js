const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservation = require("./reservation");
const seat = require("./seat");

const TicketSchema = new mongoose.Schema({
  reservation: {
    type: Schema.ObjectId,
    ref: "reservation",
    required: true,
  },
  seat: {
    type: Schema.ObjectId,
    ref: "seat",
    required: true,
  },
  status: {
    type: String,
    enum: ["canceled", "pending", "expired"],
    default: "pending",
  },
});

module.exports = mongoose.model("ticket", TicketSchema);
