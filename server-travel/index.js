const express = require("express");
const index = express();
const mustacheExpresss = require("mustache-express");
//const cors = require('cors')
//creating a unique id that we will use to delete our items
const { v4: uuidv4 } = require("uuid");

index.use("/css", express.static("css"));

index.use(express.urlencoded());

let trips = [];

// setting up mustache as a templating engine
index.engine("mustache", mustacheExpresss());
// the pages are located in the views directory
index.set("views", "./views");
// extension for all the pages
index.set("view engine", "mustache");

// run the server
index.listen(3000, () => {
  console.log("Server is running...");
});

// render index.mustache page for the root (/) route
// index.get("/", (req, res) => {
//   res.render("index");
// });

//route to get all trips
//will render a list of trips once we've pushed to it
index.get("/trips", (req, res) => {
  res.render("trips", { allTrips: trips });
});

//create new route to POST trips to trips array
index.post("/create-trip", (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const dateDeparture = req.body.dateDeparture;
  const dateReturn = req.body.dateReturn;

  let trip = {
    tripId: uuidv4(),
    title: title,
    imageUrl: imageUrl,
    dateDeparture: dateDeparture,
    dateReturn: dateReturn,
  };

  trips.push(trip);

  res.redirect("/trips");
});

//deleting trip based on unique id
index.post("/delete-trip", (req, res) => {
  const tripId = req.body.tripId;
  trips = trips.filter((trip) => {
    return trip.tripId != tripId;
  });
  res.redirect("/trips");
});
