const express = require("express");
const index = express();
const mustacheExpress = require("mustache-express");



const tripsRouter = require("./routes/movies");

//setting up global movies array, where we will store all movies
global.movies = []
console.log(global.movies)
index.use(express.urlencoded());
index.use("/movies", tripsRouter);

// setting up Express to use Mustache Express as template pages 
index.engine('mustache', mustacheExpress())
    // the pages are located in views directory
index.set('views', './views')
    // extension will be .mustache
index.set('view engine', 'mustache')

//starting the server
index.listen(3000, () => {
  console.log("Server is running...");
});