const express = require("express");
const router = express.Router();
const Seat = "../models/seat";

//all
router.get("/", (req, res) => {
  Seat.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

//create
router.post("/", (req, res) => {
  Seat.insertMany(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

//update

router.patch("/", (req, res) => {
  req.body.forEach((value) => {
    const id = value._id;
    const available = value.isAvailable;
    Seat.findOneAndUpdate({ _id: id }, { $set: { isAvailable: available } })
      .then(() => {
        console.log("Silla seleccionada");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });
  res.send({ message: "Reserva exitosa" });
});

module.exports = router;
