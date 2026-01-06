const express = require("express");
const router = express.Router();
const { addEmployee } = require("../controllers/employeeController");

router.post("/add", addEmployee);

module.exports = router;
