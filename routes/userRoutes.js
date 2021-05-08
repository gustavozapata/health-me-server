const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

//private routes
router.patch("/update/:id", userController.updateDetails);
router.get("/me", userController.getUser);

module.exports = router;
