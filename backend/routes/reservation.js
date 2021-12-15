const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const ticket = require("../models/ticket");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const verifyUser = require("../middleware/verifyToken");

// Create a reservation
router.post("/", verifyAdmin, verifyUser, async (req, res) => {
  const reservation = new Reservation({
    date: req.body.date,
    time: req.body.time,
    seatId: req.body.seatId,
    ticket: req.body.ticket,
    price: req.body.price,
    movieId: req.body.movieId,
  });
  saveTicket(reservation, req.body.ticket);
  try {
    const newMovie = await movie.save();
    return res.status(201).json(newMovie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get all reservations
router.get("/reservations", verifyAdmin, verifyUser, async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get reservation by id
router.get("/reservations/:id", verifyAdmin, verifyUser, async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update reservation by id
router.put("/:id", verifyAdmin, verifyUser, async (req, res) => {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    reservation.date = req.body.date;
    reservation.time = req.body.time;
    reservation.seatId = req.body.seatId;
    reservation.ticket = req.body.ticket;
    reservation.price = req.body.price;
    reservation.movieId = req.body.movieId;
    if (req.body.ticket != null && req.body.ticket !== "") {
      saveTicket(reservation, req.body.ticket);
    }
    await reservation.save();
    return res.status(200).json(reservation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete reservation
router.delete(
  "/reservations/:id",
  verifyAdmin,
  verifyUser,
  async (req, res) => {
    const _id = req.params.id;
    try {
      const reservation = await Reservation.findByIdAndDelete(_id);
      return !reservation ? res.sendStatus(404) : res.send(reservation);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
);

module.exports = router;
