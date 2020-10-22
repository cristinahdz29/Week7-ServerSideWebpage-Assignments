const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// localhost:3000/movies/
router.get("/", (req, res) => {

  res.render("movies", { movies: movies });
});

//route to add a movie
router.post("/create", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const genre = req.body.genre;
  const posterUrl = req.body.posterUrl;

  let movie = {
    movieId: uuidv4(),
    title: title,
    description: description,
    genre: genre,
    posterUrl: posterUrl,
  };

  movies.push(movie);

  res.redirect("/movies");
});

//delete a movie
router.post("/delete", (req, res) => {
  const movieId = req.body.movieId;
  console.log(movieId)
  movies = movies.filter((movie) => {
    return movie.movieId != movieId;
  });
  res.redirect("/movies");
});

//filter through movies based on genre
router.post("/genre", (req, res)=> {
    const genre = req.body.genre
    console.log(genre)
    filteredmovies = movies.filter((movie) => {
        return movie.genre == genre;
    })
    res.render("movies", {movies: filteredmovies})
})

//getting movie details
// /movies/:movieId 
router.post("/:movieId", (req, res)=> {
    const movieId = req.params.movieId
    const selectedMovie = movies.filter((movie) => movie.movieId === movieId)
    res.render("movies", { movies: selectedMovie, moreInfo: true });
})

module.exports = router;
