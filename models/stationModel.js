const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
  location: String,
  address: String,
  postcode: String,
  telephone: String,
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
