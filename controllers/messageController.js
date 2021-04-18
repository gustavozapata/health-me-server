const User = require('../models/userModel')

exports.sendMessage = async (req, res, next) => {
    let newMessages = [
        {text: req.body.option},
        sendAutoResponse(req.body.code)
    ]

    //if message action is 'cancel' booking
    if(req.body.code === 350) {
        await deleteBooking(req)
    }

    const message = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { messages: { $each: newMessages } } },
        { new: true }
    ).select("+password");

    //sort bookings for the past tests list
    message.bookings = message.bookings.sort((a, b) => b.date - a.date)

    res.status(201).json({
        status: "success",
        data: message
    })
}

//delete booking from the messages actions
const deleteBooking = async (req) => {
    let bookings = await User.findOne({_id: req.params.id}).select("bookings")
    bookings = bookings.bookings.sort((a, b) =>  b.bookedAt - a.bookedAt)
    
    if(bookings.length > 0){
        req.body._id  = bookings[0]._id
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { bookings: {_id: req.body._id} } },
            { new: true }
        ).select("+password -__v");
    }
}

exports.sendBookingMessage = async (req, res, next) => {
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { messages: sendAutoResponse(req.body.code, req.body.booking) } },
        { new: true }
    ).select("+password")

    //sort bookings for the past tests list
    user.bookings = user.bookings.sort((a, b) => b.date - a.date)

    res.status(201).json({
        status: "success",
        data: user
    })
}

const sendAutoResponse = (code, booking) => {
    let message = {
        text: "",
        isUser: false,
        options: []
    }
    switch (code) {
        case 1:
            message = {
                ...message,
                text: "Thank you for joining the Health Me community. We hope you have a healthy experience.",
                options: [{code: 100, option: "How can I start using Health Me?"}]
            }
            break
        case 100:
            message = {
                ...message,
                text: "First of all, you can start by booking an appointment. Head over the home screen and select Book a blood test. Then, simply follow the instructions.",
            }
            break
        case 200:
            message = {
                ...message,
                text: `Your appointment has been successfully booked. Your appointment is at the ${booking.location} blood station on ${dateToStringDate(booking.date)} at ${booking.time}`,
                options: [{code: 350, option: "Cancel the appointment"}]
            }
            break
        case 350:
            message = {
                ...message,
                text: "Your appointment has been cancelled",
            }
            break
    }
    return message
}
module.exports.sendAutoResponse = sendAutoResponse

const dateToStringDate = (date) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-GB", options)
}