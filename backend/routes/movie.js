const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// All movies
router.get("/", async (req, res) => {
  let query = Movie.find();
  if (req.query.name != null && req.query.name != "") {
    query = query.regex("name", new RegExp(req.query.name, "i"));
  }
  try {
    const movies = await query.exec();
    res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create movie
router.post("/", verifyAdmin, async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    description: req.body.description,
    image: req.body.image,
    format: req.body.format,
    duration: req.body.duration,
  });
  saveCover(movie, req.body.cover);

  try {
    const newMovie = await movie.save();
    return res.status(201).json(newMovie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Show movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).exec();
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update movie
router.put("/:id", verifyAdmin, async (req, res) => {
  let movie;

  try {
    movie = await Movie.findById(req.params.id);
    movie.name = req.body.name;
    movie.genre = req.body.genre;
    movie.description = req.body.description;
    movie.image = req.body.image;
    movie.format = req.body.format;
    movie.duration = req.body.duration;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(movie, req.body.cover);
    }
    await movie.save();
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete movie
router.delete("/:id", verifyAdmin, async (req, res) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    await movie.remove();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

function saveCover(movie, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    movie.coverImage = new Buffer.from(cover.data, "base64");
    movie.coverImageType = cover.type;
  }
}

module.exports = router;
