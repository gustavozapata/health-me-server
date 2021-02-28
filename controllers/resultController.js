const Result = require("../models/resultModel");

exports.getResults = async (req, res, next) => {
  const results = await Result.find();

  res.status(200).json({
    status: "success",
    data: results,
  });
};