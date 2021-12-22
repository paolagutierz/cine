const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");
const verifyAdmin = require("../middleware/verifyTokenAdmin");

// All tickets
router.get("/", async (req, res) => {
  let query = Ticket.find().populate("reservation").populate("seat");
  try {
    const tickets = await query.exec();
    res.status(200).json(tickets);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create ticket
router.post("/", async (req, res) => {
  const ticket = new Ticket({
    reservation: req.body.reservation,
    seat: req.body.seat,
    status: req.body.status,
  });
  try {
    const newTicket = await ticket.save();
    return res.status(201).json(newTicket);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show ticket
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("reservation")
      .populate("seat")
      .exec();
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update ticket
router.put("/:id", async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);
    (ticket.status = req.body.status), await ticket.save();
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete ticket
router.delete("/:id", async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);
    await ticket.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
