const User = require("../models/userModel");

exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    //check if email and password were entered (were sent)
  if (!email || !password) {
    return console.log("Please provide email and password");
  }

  //check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || password !== user.password) {
    return console.log("Incorrect email or password");
  }

  //TODO: IMPLEMENT JWT
    res.status(200).json({
        status: "success",
        data: user,
        isLogged: true,
    });
}

exports.signup = async(req, res, next) => {
    const { fullname, email, password } = req.body;

  //TODO: the above is replaces this: await User.create(req.body);
  //problem with the above is that the user can send a body to that route with say {admin: true} and this is not good
  const newUser = await User.create({fullname, email, password});
  console.log(newUser)

  //TODO: IMPLEMENT JWT
  res.status(201).json({
    status: "success",
    data: newUser,
    isLogged: true,
});

}
