const Guide = require("../models/guideModel");

exports.getGuides = async (req, res, next) => {
  const guides = await Guide.find();

  res.status(200).json({
    status: "success",
    data: guides,
  });
};
