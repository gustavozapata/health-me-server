const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

router.get("/", resultController.getResults);

module.exports = router;
