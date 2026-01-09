const Attendance = require("../models/Attendance");

const today = () => new Date().toISOString().split("T")[0];

exports.checkIn = async (req, res) => {
  const { workType, location } = req.body;

  const exists = await Attendance.findOne({
    employee: req.user.userId,
    date: today()
  });

  if (exists) {
    return res.status(400).json({ message: "Already checked in" });
  }

  const attendance = await Attendance.create({
    employee: req.user.userId,
    date: today(),
    workType,
    checkIn: {
      time: new Date(),
      location
    }
  });

  res.json({ message: "Checked in successfully", attendance });
};

exports.checkOut = async (req, res) => {
  const { location } = req.body;

  const attendance = await Attendance.findOne({
    employee: req.user.userId,
    date: today()
  });

  if (!attendance || !attendance.checkIn) {
    return res.status(400).json({ message: "Check-in required" });
  }

  attendance.checkOut = {
    time: new Date(),
    location
  };

  await attendance.save();

  res.json({ message: "Checked out successfully" });
};
