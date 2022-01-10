const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const upload = require("../services/multer");

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
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    image: req.body.image,
    format: req.body.format,
    duration: req.body.duration,
  });
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
    movie.title = req.body.title;
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

  //upload image
  router.post(
    "/movie/upload",
    upload("movie").single("file"),
    async (req, res, next) => {
      const url = `${req.protocol}://${req.get("host")}`;
      const { file } = req;
      const movieId = req.params.id;
      try {
        if (!file) {
          const error = new Error("Please upload a file");
          error.httpStatusCode = 400;
          return next(error);
        }
        const movie = await Movie.findById(movieId);
        if (!movie) return res.sendStatus(404);
        movie.image = `${url}/${file.path}`;
        await movie.save();
        res.send({ movie, file });
      } catch (e) {
        console.log(e);
        res.sendStatus(400).send(e);
      }
    }
  );
});

module.exports = router;
