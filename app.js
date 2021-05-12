const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const stationRouter = require("./routes/stationRoutes");
const resultRouter = require("./routes/resultRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

dotenv.config(); //allows the use of env variables

app.use(express.json()); //allows us to access the body of the request

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev")); //logs all the server activity
}

//router endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/stations", stationRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/messages", messageRouter);

module.exports = app;
