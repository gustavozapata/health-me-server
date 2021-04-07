const User = require('../models/userModel')

exports.sendMessage = async (req, res, next) => {
    const message = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { messages: req.body },
        },
        { new: true }
    ).select("+password");

    res.status(201).json({
        status: "success",
        data: message
    })
}