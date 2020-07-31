const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
