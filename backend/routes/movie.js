const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const MovieShow = require("../models/movieShow");
const verifyAdmin = require("../middleware/verifyTokenAdmin");
const multer = require("multer");
const fileUpload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");
const elasticsearch= require("@elastic/elasticsearch");
const client= new elasticsearch.Client({
  host:'localhost:9200'
});
dotenv.config();

// All movies
router.get("/", async (req, res) => {
client.index({
  index:"movie",
  type:"mytype",
  id:req.body.id,
  body:req.body,
},function(err, res, status){
  if(err){
    console.log(err);
  }else{
    return res.status(200)
.send({
  message: `GET movie succeeded`
   }) 
  }
})
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

//upload image

router.post("/upload/", fileUpload.single("movie"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    const movie = await Movie.findById(req.body.movieId);
    movie.image = result.url;
    try {
      await movie.save();
      return res.status(200).json(movie);
    } catch (err) {
      return res.status(500).json(err);
    }
    console.log(result);
  }

  upload(req);
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

    const movieShows = await MovieShow.find({ movie: req.params.id }).exec();
    console.log(movieShows);
    await Promise.all(
      movieShows.map(async (movieShow) => {
        try {
          await movieShow.remove();
        } catch (err) {
          console.log(err);
        }
      })
    );
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
