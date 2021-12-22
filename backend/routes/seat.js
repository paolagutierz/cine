const express = require("express");
const router = express.Router();
const Seat = require("../models/seat");
const verifyAdmin = require("../middleware/verifyTokenAdmin");

// All seats
router.get("/", async (req, res) => {
  let query = Seat.find().populate("cinema");
  try {
    const seats = await query.exec();
    res.status(200).json(seats);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create Seat
router.post("/", async (req, res) => {
  const seat = new Seat({
    cinema: req.body.cinema,
    number: req.body.number,
  });
  try {
    const newSeat = await seat.save();
    return res.status(201).json(newSeat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show seat
router.get("/:id", async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate("cinema").exec();
    return res.status(200).json(seat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update seat
router.put("/:id", async (req, res) => {
  let seat;
  try {
    seat = await Seat.findById(req.params.id);
    seat.cinema = req.body.cinema;
    seat.number = req.body.number;
    await seat.save();
    return res.status(200).json(seat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete seat
router.delete("/:id", verifyAdmin, async (req, res) => {
  let seat;
  try {
    seat = await Seat.findById(req.params.id);
    await seat.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get reserved* seats by showtime
router.get("/:movieshow", async (req, res) => {
  try {
    const seat = await Seat.findOne({ movieShow: movieShow })
      .populate("cinema")
      .exec();
    return res.status(200).json(seat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
