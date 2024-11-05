const Trip = require("./models/tripdata");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("conneted");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(5000);

app.post("/newTrip", async (req, res) => {
  try {
    const trip = new Trip({
      name: req.body.tripName,
      items: [],
    });
    await trip
      .save()
      .then((r) => {
        res.status(201).json({ tripId: r.id });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/addItems", async (req, res) => {
  try {
    const trip = await Trip.findOne({ id: req.body.tripId });

    // const newTripItems = [...new Set([...trip.items, ...req.body.tripItems])];

    const response = await Trip.findOneAndUpdate(
      { id: req.body.tripId },
      { items: req.body.tripItems },
      { new: true }
    );
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/findTrip/:tripId", async (req, res) => {
  try {
    const getTrip = await Trip.findOne({ id: req.params.tripId });
    if (!getTrip) {
      return res.status(404).json({ message: "Trip Id not Found" });
    }
    res.json({ tripId: getTrip.id, items: getTrip.items, name: getTrip.name });
  } catch (err) {
    res.status(500).json({ message: "Error retriving trip", err });
  }
});
