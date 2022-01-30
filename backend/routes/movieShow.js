const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
moment().tz("America/Bogota").format();
const MovieShow = require("../models/movieShow");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const Cinema = require("../models/cinema");

// All movie shows
router.get("/", async (req, res) => {
  let query = MovieShow.find().populate("cinema").populate("movie");
  try {
    const movieShows = await query.exec();
    res.status(200).json(movieShows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create Movie Show
router.post("/", async (req, res) => {
  const cinema = await Cinema.findOne({ number: req.body.cinemaNumber });
  const movieShow = new MovieShow({
    movie: req.body.movie,
    cinema: cinema._id,
    startTime: moment(req.body.startTime).format("YYYY-MM-DDTHH:mm"),
    endTime: moment(req.body.endTime).format("YYYY-MM-DDTHH:mm"),
  });
  try {
    const newMovieShow = await movieShow.save();
    return res.status(201).json(newMovieShow);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show Movie Show
router.get("/movie/:id", async (req, res) => {
  try {
    const movieShow = await MovieShow.find({ movie: req.params.id })
      .sort({ startTime: "asc" })
      .populate("cinema")
      .populate("movie")
      .exec();
    return res.status(200).json(movieShow);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update movie show
router.put("/:id", async (req, res) => {
  const cinema = await Cinema.findOne({ number: req.body.cinemaNumber });
  let movieShow;
  try {
    movieShow = await MovieShow.findById(req.params.id);
    movieShow.cinema = cinema._id;
    movieShow.movie = req.body.movie;
    movieShow.startTime = req.body.startTime;
    movieShow.endTime = req.body.endTime;
    await movieShow.save();
    return res.status(200).json(movieShow);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete movie show
router.delete("/:id", verifyAdmin, async (req, res) => {
  let movieShow;
  try {
    movieShow = await MovieShow.findById(req.params.id);
    await movieShow.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
