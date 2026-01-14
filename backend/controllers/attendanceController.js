const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const Holiday = require("../models/Holiday");
const getCityFromLatLng = require("../utils/getCityFromLatLng");

/* ================= CONFIG ================= */
const OFFICE_LATE_TIME_HOUR = 9;
const OFFICE_LATE_TIME_MIN = 15;

const todayDate = () =>
  new Date().toISOString().split("T")[0];

const isSunday = (date) =>
  new Date(date).getDay() === 0;

const getLateMinutes = (checkInTime) => {
  const officeTime = new Date(checkInTime);
  officeTime.setHours(OFFICE_LATE_TIME_HOUR, OFFICE_LATE_TIME_MIN, 0, 0);
  return checkInTime <= officeTime
    ? 0
    : Math.floor((checkInTime - officeTime) / 60000);
};

/* ================= CHECK-IN ================= */
exports.checkIn = async (req, res) => {
  try {
    const { workType, location } = req.body;
    const today = todayDate();

    const exists = await Attendance.findOne({
      employee: req.user.userId,
      date: today
    });

    if (exists) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const holiday = await Holiday.findOne({ date: today });
    if (holiday) {
      await Attendance.create({
        employee: req.user.userId,
        date: today,
        workType,
        status: "Holiday"
      });
      return res.json({ message: `Holiday: ${holiday.name}` });
    }

    if (isSunday(today)) {
      await Attendance.create({
        employee: req.user.userId,
        date: today,
        workType,
        status: "WeeklyOff"
      });
      return res.json({ message: "Weekly Off" });
    }

    const city = await getCityFromLatLng(location.lat, location.lng);
    const checkInTime = new Date();
    const lateMinutes = getLateMinutes(checkInTime);

    await Attendance.create({
      employee: req.user.userId,
      date: today,
      workType,
      checkIn: { time: checkInTime, location, city },
      status: lateMinutes > 0 ? "Late" : "Present",
      lateMinutes
    });

    res.json({ message: "Checked in successfully" });
  } catch {
    res.status(500).json({ message: "Check-in failed" });
  }
};

/* ================= CHECK-OUT ================= */
exports.checkOut = async (req, res) => {
  try {
    const today = todayDate();
    const { location } = req.body;

    const attendance = await Attendance.findOne({
      employee: req.user.userId,
      date: today
    });

    if (!attendance?.checkIn) {
      return res.status(400).json({ message: "Check-in required" });
    }

    if (attendance.checkOut?.time) {
      return res.status(400).json({ message: "Already checked out" });
    }

    const city = await getCityFromLatLng(location.lat, location.lng);

    attendance.checkOut = {
      time: new Date(),
      location,
      city
    };

    await attendance.save();
    res.json({ message: "Checked out successfully" });
  } catch {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/* ================= VIEWS ================= */
exports.getMyAttendance = async (req, res) => {
  const data = await Attendance.find({ employee: req.user.userId })
    .sort({ date: -1 });
  res.json(data);
};

exports.getAllAttendance = async (req, res) => {
  const data = await Attendance.find()
    .populate("employee", "name email role department")
    .sort({ date: -1 });
  res.json(data);
};

exports.getManagerAttendance = async (req, res) => {
  const manager = await Employee.findById(req.user.userId);
  if (!manager || manager.role !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  const employees = await Employee.find({
    department: manager.department,
    role: "employee"
  }).select("_id");

  const data = await Attendance.find({
    employee: { $in: employees.map(e => e._id) }
  })
    .populate("employee", "name email department")
    .sort({ date: -1 });

  res.json(data);
};
