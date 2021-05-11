const User = require('../models/userModel')
const Result = require("../models/resultModel");
const { BLOOD_TYPES, randomise, randomiseDecimal, handleError } = require('../utils/results');

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.find();

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch(err) {
    console.log(err)
  }
};

exports.sendResults = async (req, res, next) => {
  const results = randomiseResults(req.body.date)

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { results: results } },{ new: true }
    ).select("+password");

    //sort bookings for the past tests list
    user.bookings = user.bookings.sort((a, b) => b.date - a.date)

    res.status(201).json({
      status: "success",
      data: user
    })
  } catch(err){
    handleError(res, err)
  }
}

const randomiseResults = (date) => ({
  blood_type: BLOOD_TYPES[Math.floor(Math.random() * BLOOD_TYPES.length)],
  test: "Full-Screen",
  date: date,
  red_blood_cells: randomiseDecimal(2, 7),
  whiteBloodCells: randomise(3000, 12000),
  plateletCount:randomise(120000, 500000),
  cholesterolLevel:randomise(100, 300),
  glucose_level:randomise(70, 300),
  hemoglobin:randomise(123, 350),
})