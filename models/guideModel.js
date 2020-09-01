const mongoose = require("mongoose");

const guideSchema = mongoose.Schema({
  user: Number,
  guide: Object,
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
