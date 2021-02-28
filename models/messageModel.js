const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    id: String,
    sender: String,
    read: Boolean,
    threads: [{
        id: String,
        date: String,
        time: String,
        text: String,
        user: Boolean,
        options: [String]
    }]
})

module.exports = MessageSchema;
