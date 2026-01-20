const express = require("express");
const router = express.Router();
const { completeProbationManually } = require("../controllers/probationController");

router.post("/complete/:id", completeProbationManually);

module.exports = router;
