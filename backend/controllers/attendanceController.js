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
  officeTime.setHours(
    OFFICE_LATE_TIME_HOUR,
    OFFICE_LATE_TIME_MIN,
    0,
    0
  );

  if (checkInTime <= officeTime) return 0;
  return Math.floor((checkInTime - officeTime) / 60000);
};

/* ================= CHECK-IN ================= */
exports.checkIn = async (req, res) => {
  try {
    const { workType, location } = req.body;
    const today = todayDate();

    let attendance = await Attendance.findOne({
      employee: req.user.userId,
      date: today
    });

    if (attendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked" });
    }

    // Holiday
    const holiday = await Holiday.findOne({ date: today });
    if (holiday) {
      attendance = await Attendance.create({
        employee: req.user.userId,
        date: today,
        workType,
        status: "Holiday"
      });

      return res.json({
        message: `Holiday: ${holiday.name}`
      });
    }

    // Weekly Off
    if (isSunday(today)) {
      await Attendance.create({
        employee: req.user.userId,
        date: today,
        workType,
        status: "WeeklyOff"
      });

      return res.json({
        message: "Weekly Off"
      });
    }

    const city = await getCityFromLatLng(
      location.lat,
      location.lng
    );

    const checkInTime = new Date();
    const lateMinutes = getLateMinutes(checkInTime);

    await Attendance.create({
      employee: req.user.userId,
      date: today,
      workType,
      checkIn: {
        time: checkInTime,
        location,
        city
      },
      status: lateMinutes > 0 ? "Late" : "Present",
      lateMinutes
    });

    res.json({ message: "Checked in successfully" });
  } catch (err) {
    console.error(err);
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

    if (!attendance || !attendance.checkIn) {
      return res
        .status(400)
        .json({ message: "Check-in required" });
    }

    if (attendance.checkOut?.time) {
      return res
        .status(400)
        .json({ message: "Already checked out" });
    }

    const city = await getCityFromLatLng(
      location.lat,
      location.lng
    );

    attendance.checkOut = {
      time: new Date(),
      location,
      city
    };

    await attendance.save();
    res.json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/* ================= EMPLOYEE ================= */
exports.getMyAttendance = async (req, res) => {
  const attendance = await Attendance.find({
    employee: req.user.userId
  }).sort({ date: -1 });

  res.json(attendance);
};

/* ================= ADMIN ================= */
exports.getAllAttendance = async (req, res) => {
  const attendance = await Attendance.find()
    .populate("employee", "name email role department")
    .sort({ date: -1 });

  res.json(attendance);
};

/* ================= MANAGER ================= */
exports.getManagerAttendance = async (req, res) => {
  try {
    // 1️⃣ Get logged-in manager
    const manager = await Employee.findById(req.user.userId);

    if (!manager || manager.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2️⃣ Get employees from same department
    const employees = await Employee.find({
      department: manager.department,
      role: "employee"
    }).select("_id");

    const employeeIds = employees.map(e => e._id);

    // 3️⃣ Fetch attendance
    const attendance = await Attendance.find({
      employee: { $in: employeeIds }
    })
      .populate("employee", "name email department")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load manager attendance"
    });
  }
};

