const Attendance = require("../models/Attendance");

const today = () => new Date().toISOString().split("T")[0];

exports.checkIn = async (req, res) => {
  try {
    const { workType, location } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const exists = await Attendance.findOne({
      employee: req.user.userId,
      date: today
    });

    if (exists) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    await Attendance.create({
      employee: req.user.userId,
      date: today,
      workType,
      checkIn: {
        time: new Date(),
        location
      }
    });

    res.json({ message: "Checked in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Check-in failed" });
  }
};


exports.checkOut = async (req, res) => {
  try {
    const { location } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employee: req.user.userId,
      date: today
    });

    if (!attendance) {
      return res.status(400).json({ message: "Check-in required" });
    }

    if (attendance.checkOut?.time) {
      return res.status(400).json({ message: "Already checked out" });
    }

    attendance.checkOut = {
      time: new Date(),
      location
    };

    await attendance.save();

    res.json({ message: "Checked out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Check-out failed" });
  }
};

