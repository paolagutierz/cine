const mongoose = require("mongoose");
const { Schema } = mongoose;
const TicketSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: "reservation",
    required: true,
  },
  status: {
    type: String,
    enum: ["canceled", "pending", "expired"],
  },
});

module.exports = mongoose.model("ticket", TicketSchema);
