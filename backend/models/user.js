const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  documentType: {
    type: String,
    required: true,
  },
  documentNumb: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true,
  },
  password: {
    type: String,
    default: true,
    minlength: 5,
  },
  token: {
    type: String,
  },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", UserSchema);
