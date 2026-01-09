const Attendance = require("../models/Attendance");
const getCityFromLatLng = require("../utils/getCityFromLatLng");

const todayDate = () => new Date().toISOString().split("T")[0];


exports.checkIn = async (req, res) => {
  try {
    const { workType, location } = req.body;
    const today = todayDate();

    const exists = await Attendance.findOne({
      employee: req.user.userId,
      date: today,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    // 🔥 Convert lat/lng to city
    const city = await getCityFromLatLng(
      location.lat,
      location.lng
    );

    await Attendance.create({
      employee: req.user.userId,
      date: today,
      workType,
      checkIn: {
        time: new Date(),
        location,
        city, // ✅ STORED
      },
    });

    res.json({ message: "Checked in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Check-in failed" });
  }
};

/* =======================
   CHECK OUT
======================= */
exports.checkOut = async (req, res) => {
  try {
    const { location } = req.body;
    const today = todayDate();

    const attendance = await Attendance.findOne({
      employee: req.user.userId,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        message: "Check-in required",
      });
    }

    if (attendance.checkOut?.time) {
      return res.status(400).json({
        message: "Already checked out",
      });
    }

    // 🔥 Convert lat/lng to city
    const city = await getCityFromLatLng(
      location.lat,
      location.lng
    );

    attendance.checkOut = {
      time: new Date(),
      location,
      city, // ✅ STORED
    };

    await attendance.save();

    res.json({ message: "Checked out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Check-out failed" });
  }
};
