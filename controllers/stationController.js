const Station = require("../models/stationModel");

//get all the blood stations
exports.getStations = async (req, res, next) => {
  try {
    const stations = await Station.find();

    res.status(200).json({
      status: "success",
      data: stations,
    });
  } catch(err) {
    console.log(err)
  }
};
