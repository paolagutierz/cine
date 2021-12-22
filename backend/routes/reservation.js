const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const verifyAdmin = require("../middleware/verifyTokenAdmin");

// All reservations
router.get("/", async (req, res) => {
  let query = Reservation.find().populate("user").populate("movieShow");
  try {
    const reservation = await query.exec();
    res.status(200).json(reservation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create reservation
router.post("/", async (req, res) => {
  const reservation = new Reservation({
    user: req.body.user,
    movieShow: req.body.movieShow,
    created: new Date(),
    price: req.body.price,
    status: req.body.status,
  });
  try {
    const newReservation = await reservation.save();
    return res.status(201).json(newReservation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show reservation
router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("user")
      .populate("movieShow")
      .exec();
    return res.status(200).json(reservation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update reservation
router.put("/:id", async (req, res) => {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    reservation.user = req.body.user;
    reservation.movieShow = req.body.movieShow;
    reservation.created = req.body.created;
    reservation.price = req.body.price;
    reservation.status = req.body.status;

    await reservation.save();
    return res.status(200).json(reservation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete reservation
router.delete("/:id", async (req, res) => {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    await reservation.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
