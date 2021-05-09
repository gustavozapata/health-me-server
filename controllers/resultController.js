const User = require('../models/userModel')
const Result = require("../models/resultModel");
const { BLOOD_TYPES, randomise } = require('../utils/results');

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
    console.log(err)
  }
}

const randomiseResults = (date) => ({
  blood_type: BLOOD_TYPES[Math.floor(Math.random() * BLOOD_TYPES.length)],
  test: "Full-Screen",
  date: date,
  red_blood_cells: randomise(1000, 3000),
  whiteBloodCells:1988,
  cholesterolLevel:randomise(100, 200),
  glucose_level:randomise(133, 350),
  hemoglobin:randomise(123, 350),
  plateletCount:randomise(124, 350),
})