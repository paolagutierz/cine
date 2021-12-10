const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// All movies
router.get("/", async (req, res) => {
  let query = Movie.find();
  if (req.query.name != null && req.query.name != "") {
    query = query.regex("name", new RegExp(req.query.name, "i"));
  }
  try {
    const movies = await query.exec();
    res.render("movies/index", {
      movies: movies,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New movie
router.get("/new", async (req, res) => {
  renderNewPage(res, new Movie());
});

// Create movie
router.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    description: req.body.description,
    image: req.body.image,
    format: req.body.format,
    duration: req.body.format,
  });
  saveCover(movie, req.body.cover);

  try {
    const newMovie = await movie.save();
    res.redirect(`movies/${newMovie.id}`);
  } catch {
    renderNewPage(res, movie, true);
  }
});

// Show movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("name").exec();
    res.render("movies/show", { movie: movie });
  } catch {
    res.redirect("/");
  }
});

// Edit movie
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    renderEditPage(res, movie);
  } catch {
    res.redirect("/");
  }
});

// Update movie
router.put("/:id", async (req, res) => {
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
    res.redirect(`/movies/${movie.id}`);
  } catch {
    if (movie != null) {
      renderEditPage(res, movie, true);
    } else {
      redirect("/");
    }
  }
});

// Delete movie
router.delete("/:id", async (req, res) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    await movie.remove();
    res.redirect("/movies");
  } catch {
    if (movie != null) {
      res.render("movies/show", {
        movie: movie,
        errorMessage: "no se pudo eliminar la pelicula",
      });
    } else {
      res.redirect("/");
    }
  }
});

async function renderNewPage(res, movie, hasError = false) {
  renderFormPage(res, movie, "new", hasError);
}

async function renderEditPage(res, movie, hasError = false) {
  renderFormPage(res, movie, "edit", hasError);
}

async function renderFormPage(res, movie, form, hasError = false) {
  try {
    const name = await Movie.find({});
    const params = {
      movie: movie,
    };
    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error Updating movie";
      } else {
        params.errorMessage = "Error Creating movie";
      }
    }
    res.render(`movies/${form}`, params);
  } catch {
    res.redirect("/movies");
  }
}

function saveCover(movie, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    movie.coverImage = new Buffer.from(cover.data, "base64");
    movie.coverImageType = cover.type;
  }
}

module.exports = router;
