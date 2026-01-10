const Attendance = require("../models/Attendance");
const getCityFromLatLng = require("../utils/getCityFromLatLng");
const Employee = require("../models/Employee");


const OFFICE_LATE_TIME = "9:15";

const todayDate = () => new Date().toISOString().split("T")[0];

const getLateMinutes = (checkInTime) => {
  const lateTime = new Date(checkInTime);
  lateTime.setHours(9, 15, 0, 0);

  if (checkInTime <= lateTime) return 0;
  return Math.floor((checkInTime - lateTime) / 60000);
};

/* =======================
   CHECK IN
======================= */
exports.checkIn = async (req, res) => {
  try {
    const { workType, location } = req.body;
    const today = todayDate();

    const exists = await Attendance.findOne({
      employee: req.user.userId,
      date: today,
    });

    if (exists) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const city = await getCityFromLatLng(location.lat, location.lng);

    const checkInTime = new Date();
    const lateMinutes = getLateMinutes(checkInTime);

    await Attendance.create({
      employee: req.user.userId,
      date: today,
      workType,
      checkIn: {
        time: checkInTime,
        location,
        city,
      },
      status: lateMinutes > 0 ? "Late" : "Present",
      lateMinutes
    });

    res.json({ message: "Checked in successfully" });
  } catch (err) {
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
      return res.status(400).json({ message: "Check-in required" });
    }

    if (attendance.checkOut?.time) {
      return res.status(400).json({ message: "Already checked out" });
    }

    const city = await getCityFromLatLng(location.lat, location.lng);

    attendance.checkOut = {
      time: new Date(),
      location,
      city,
    };

    await attendance.save();

    res.json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/* =======================
   EMPLOYEE ATTENDANCE
======================= */
exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({
    employee: req.user.userId,
  }).sort({ date: -1 });

  res.json(records);
};

/* =======================
   ADMIN ATTENDANCE
======================= */
exports.getAllAttendance = async (req, res) => {
  const records = await Attendance.find()
    .populate("employee", "name email role")
    .sort({ date: -1 });

  res.json(records);
};


exports.getManagerAttendance = async (req, res) => {
  try {
    

    // 1 Get manager from DB
    const manager = await Employee.findById(req.user.userId);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    const department = manager.department;

    // 2️⃣ Get employees of same department (including manager if needed)
    const employees = await Employee.find({
      department
    }).select("_id");

    if (employees.length === 0) {
      return res.json([]);
    }

    const employeeIds = employees.map(e => e._id);

    // 3️⃣ Get attendance of those employees
    const attendance = await Attendance.find({
      employee: { $in: employeeIds }
    })
      .populate("employee", "name email role department")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load manager attendance" });
  }
};
