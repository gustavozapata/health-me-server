const express = require("express");

const userRouter = require("./routes/userRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const stationRouter = require("./routes/stationRoutes");
const resultRouter = require("./routes/resultRoutes");

const app = express();

/*

ALL THE MIDDLEWARE HERE

*/

app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/stations", stationRouter);
app.use("/api/v1/results", resultRouter);

module.exports = app;
