const express = require("express");
const router = express.Router();
const Seat = require("../models/seat");
const Reservation = require("../models/reservation");
const MovieShow = require("../models/movieShow");
const Ticket = require("../models/ticket");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const ticket = require("../models/ticket");
const reservation = require("../models/reservation");
const seatService = require("../services/seatService");

// All seat  status
router.get("/", (req, res) => {
  Seat.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

// Create Seat
router.post("/", (req, res) => {
  Seat.insertMany(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
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

//show reserved seats
router.get("/movieshow/:id", async (req, res) => {
  try {
    const reservedSeats = await seatService.getReservedSeats(req.params.id);
    return res.status(200).json(reservedSeats);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update seat
router.put("/:id", async (req, res) => {
  let seat;
  try {
    seat = await Seat.findById(req.params.id).exec();
    seat.cinema = req.body.cinema;
    seat.number = req.body.number;
    await seat.save();
    return res.status(200).json(seat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update seat status:release seat
router.put("/reservation/:id", async (req, res) => {
  try {
    await Promise.all(
      req.body.seats.map(async (number) => {
        const seat = await Seat.findOne({ number });
        const ticket = await Ticket.findOne({
          seat: seat.id,
          reservation: req.params.id,
        });
        ticket.status = "canceled";
        await ticket.save();
      })
    );
    return res.status(204).send("silla liberada exitosamente");
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

module.exports = router;
