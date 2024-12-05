const Trip = require("./models/tripdata");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.listen(5000);
let isConnected; // Track connection status

DBLINK = process.env.DB_URL;

async function connectToDatabase() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(DBLINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState; // Store connection status
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

app.post("/newTrip", async (req, res) => {
  await connectToDatabase();
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
  await connectToDatabase();
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

app.get("/findtrip/:tripId", async (req, res) => {
  await connectToDatabase();
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

/*app.listen(5000);
mongoose
  .connect(
   ""
  )
  .then(() => {
    console.log("conneted");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/
