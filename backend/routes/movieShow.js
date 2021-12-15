const express = require("express");
const router = express.Router();
const movieShow = require("../models/movieShow");
const verifyAdmin = require("../middleware/verifyTokenAdmin");

module.exports = router;
