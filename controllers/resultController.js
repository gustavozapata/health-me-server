const User = require('../models/userModel')
const Result = require("../models/resultModel");

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
  blood_type: "B+",
  test: "CBC",
  date: date,
  red_blood_cells: 2988,
  whiteBloodCells:1988,
  cholesterolLevel:2,
  glucose_level:33,
  hemoglobin:23,
  plateletCount:12,
})