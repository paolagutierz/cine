const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Reservation = require("../models/reservation");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const verifyUser = require("../middleware/verifyToken");

// Create ticket
router.post("/", verifyAdmin, verifyUser, async (req, res) => {
  const ticket = new Ticket({
    user: req.body.User,
    reservation: req.body.Reservation,
    status: req.body.status,
  });
  sendTicket(ticket, req.body.ticket);

  try {
    const newTicket = await ticket.save();
    return res.status(201).json(newTicket);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get reservation ticket by id
router.get("/reservations/ticket/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    reservation.ticket = true;
    await reservation.save();
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }

  // Update ticket by id
  router.put("/:id", verifyAdmin, verifyUser, async (req, res) => {
    let ticket;

    try {
      ticket = await ticket.findById(req.params.id);
      ticket.user = req.body.User;
      ticket.reservation = req.body.Reservation;
      ticket.confirmation = req.body.confirmation;
      if (req.body.ticket != null && req.body.ticket !== "") {
        sendTicket(ticket, req.body.ticket);
      }
      await ticket.save();
      return res.status(200).json(ticket);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  // Delete ticket
  router.ticket("/ticket/:id", verifyAdmin, verifyUser, async (req, res) => {
    const _id = req.params.id;
    try {
      const ticket = await Ticket.findByIdAndDelete(_id);
      return !ticket ? res.sendStatus(404) : res.send(ticket);
    } catch (e) {
      return res.sendStatus(400);
    }
  });
});

module.exports = router;
