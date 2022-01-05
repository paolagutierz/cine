const express = require("express");
const router = express.Router();
const Cinema = require("../models/cinema");
const verifyAdmin = require("../middleware/verifyTokenAdmin");

// All cinemas
router.get("/", async (req, res) => {
  let query = Cinema.find();
  if (req.query.number != null && req.query.number != "") {
    query = query.regex("number", new RegExp(req.query.number, "i"));
  }
  try {
    const cinemas = await query.exec();
    res.status(200).json(cinemas);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create Cinema
router.post("/", verifyAdmin, async (req, res) => {
  const cinema = new Cinema({
    number: req.body.number,
    sort: req.body.sort,
    price: req.body.price,
  });
  try {
    const newCinema = await cinema.save();
    return res.status(201).json(newCinema);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show cinema
router.get("/:id", async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id).exec();
    return res.status(200).json(cinema);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update cinema
router.put("/:id", verifyAdmin, async (req, res) => {
  let cinema;

  try {
    cinema = await Cinema.findById(req.params.id);
    cinema.number = req.body.number;
    cinema.sort = req.body.sort;
    cinema.price = req.body.price;
    await cinema.save();
    return res.status(200).json(cinema);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete movie
router.delete("/:id", verifyAdmin, async (req, res) => {
  let cinema;
  try {
    cinema = await Cinema.findById(req.params.id);
    await cinema.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
