const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/:id", bookingController.getBookings);
router.post("/:id", bookingController.addBooking);

module.exports = router;
