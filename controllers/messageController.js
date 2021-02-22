const User = require('../models/userModel')

exports.sendMessage = async (req, res, next) => {
    const thread = {
        date: dateToString(),
        time: timeToString(),
        text: req.body.message,
        user: true
    }
     
    const user = await User.findOneAndUpdate({ "_id": req.params.id, "messages.sender": req.body.sender}, { 
        $push: {"messages.$.threads": thread}
    }).select("+password");

    res.status(201).json({
        status: "success",
        data: user
    })
}

const dateToString = () => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    var today  = new Date()
    return today.toLocaleDateString("en-UK", options)
}
const timeToString = () => {
    var today = new Date()
    return today.getHours() + ":" + today.getMinutes()
}