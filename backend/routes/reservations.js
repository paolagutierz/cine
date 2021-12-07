const express = require("express");
const auth = require("..middleware/verifyToken");
const Reservation = require("../models/reservation");
const userModeling = require("../utils/reservationModeling");

const router = new express.Router();

//hacer la reserva;
router.post("/reservations", auth.user, async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    await reservation.save();
    res.status(201).send({ reservation });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Mostar reservas
router.get("/reservations", auth.user, async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
});

// buscar reservar por id
router.get("/reservations/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// checkin de la reserva por id
router.get("/reservations/confirmation/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    reservation.confirmation = true;
    await reservation.save();
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
});

//administrar reservas
router.patch("/reservations/:id", users.user, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "date",
    "startTime",
    "seatID",
    "ticketPrice",
    "total",
    "movieID",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const reservation = await Reservation.findById(_id);
    updates.forEach((update) => (reservation[update] = req.body[update]));
    await reservation.save();
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Cancelar reserva
router.delete("/reservations/:id", auth.user, async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findByIdAndDelete(_id);
    return !reservation ? res.sendStatus(404) : res.send(reservation);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// sugeriar asientos
router.get("/reservations/usermodeling/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const suggestedSeats = await userModeling.reservationSeatsUserModeling(
      email
    );
    res.send(suggestedSeats);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
