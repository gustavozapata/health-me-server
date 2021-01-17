const Station = require("../models/stationModel");

exports.getStations = async (req, res, next) => {
  const stations = await Station.find();

  res.status(200).json({
    status: "success",
    data: stations,
  });
};
