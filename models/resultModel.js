const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
  blood_type: String,
test: String,
date: String,
red_blood_cells: Number,
whiteBloodCells:Number,
cholesterolLevel:Number,
glucose_level:Number,
hemoglobin:Number,
plateletCount:Number,
});

module.exports = ResultSchema;
