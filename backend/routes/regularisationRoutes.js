const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const controller = require("../controllers/regularisationController");

// EMPLOYEE
router.post("/", auth, controller.applyRegularisation);
router.get("/my", auth, controller.getMyRegularisations);

// MANAGER / ADMIN
router.get("/all", auth, authorize("admin", "manager"), controller.getAllRegularisations);
router.put("/:id", auth, authorize("admin", "manager"), controller.updateRegularisationStatus);

module.exports = router;
