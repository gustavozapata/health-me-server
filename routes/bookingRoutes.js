const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// router.get("/:id", bookingController.getBookings);
// router.post("/:id", bookingController.addBooking);
router.route("/:id")
    .get(bookingController.getBookings)
    .post(bookingController.addBooking)
    .delete(bookingController.deleteBooking)
router.post("/pay/:id", bookingController.addPayment);

module.exports = router;
