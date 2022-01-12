const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const Movieshow = require("../models/movieShow");
const Movie = require("../models/movie");
const Ticket = require("../models/ticket");
const User = require("../models/User");
const Seat = require("../models/seat");
const moment = require("moment");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const seatService = require("../services/seatService");

// Create reservation
router.post("/", async (req, res) => {
  //validate if seats still available, otherwise return an error
  const reservedSeats = await seatService.getReservedSeats(req.body.movieShow);

  req.body.seats.forEach((seat) => {
    if (reservedSeats.includes(seat)) {
      return res.status(500).send("la silla no esta disponible");
    }
  });

  const reservation = new Reservation({
    user: req.body.user,
    movieShow: req.body.movieShow,
    created: new Date(),
    price: req.body.price,
  });

  try {
    const newReservation = await reservation.save();

    const userInfo = await User.findById(newReservation.user).exec();

    const showtime = await Movieshow.findById(newReservation.movieShow)
      .populate("movie")
      .populate("cinema")
      .exec();

    const ticketArr = [];

    await Promise.all(
      req.body.seats.map(async (seatNumber) => {
        try {
          const seat = await Seat.findOne({ number: seatNumber });
          console.log(seatNumber);
          const ticket = new Ticket({
            reservation: newReservation.id,
            seat: seat.id,
          });

          await ticket.save();
          ticketArr.push({
            to: userInfo.email,
            movie: showtime.movie.title,
            date: moment(showtime.startTime).format("YYYY-MM-DD"),
            time: moment(showtime.startTime).format("HH:mm"),
            cinema: showtime.cinema.number,
            seat: seatNumber,
          });
        } catch (err) {
          console.log("there was an error creating a ticket" + err);
        }
      })
    );

    return res.status(201).json(ticketArr);
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

// Show reservation by user
router.get("/user/:id", async (req, res) => {
  try {
    const reservation = await Reservation.find({ user: req.params.id })
      .populate("user")
      .populate({
        path: "movieShow",
        populate: { path: "movie", model: Movie },
      })
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

// cancel reservation
router.delete("/:id", async (req, res) => {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    reservation.status = "canceled";
    await reservation.save();

    const tickets = await Ticket.find({ reservation: reservation.id }).exec();
    await Promise.all(
      tickets.map(async (ticket) => {
        try {
          ticket.status = "canceled";
          await ticket.save();
        } catch (err) {
          return res.status(500).json(err);
        }
      })
    );
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
