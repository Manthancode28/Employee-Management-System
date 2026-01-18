const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

router.post("/", auth, authorize("admin", "manager"), createEvent);
router.get("/", auth, getEvents);

// ✨ NEW
router.put("/:id", auth, authorize("admin", "manager"), updateEvent);
router.delete("/:id", auth, authorize("admin"), deleteEvent);

module.exports = router;
