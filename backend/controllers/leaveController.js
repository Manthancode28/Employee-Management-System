const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const {
  getDateRange,
  isSunday,
  isHoliday
} = require("../utils/leaveUtils");

/* ================= APPLY LEAVE ================= */
exports.applyLeave = async (req, res) => {
  const { fromDate, toDate, reason } = req.body;

  const leave = await Leave.create({
    employee: req.user.userId,
    fromDate,
    toDate,
    reason
  });

  res.json({ message: "Leave applied", leave });
};

/* ================= MANAGER VIEW (FIXED) ================= */
exports.getManagerLeaves = async (req, res) => {
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

  // 3️⃣ Fetch leaves
  const leaves = await Leave.find({
    employee: { $in: employeeIds }
  }).populate("employee", "name email department");

  res.json(leaves);
};

/* ================= APPROVE / REJECT ================= */
exports.updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  const leave = await Leave.findById(leaveId);
  if (!leave) {
    return res.status(404).json({ message: "Leave not found" });
  }

  leave.status = status;
  leave.approvedBy = req.user.userId;
  await leave.save();

  if (status === "Approved") {
    await applyLeaveToAttendance(leave);
  }

  res.json({ message: `Leave ${status}` });
};

/* ================= APPLY LEAVE TO ATTENDANCE ================= */
const applyLeaveToAttendance = async (leave) => {
  const dates = getDateRange(leave.fromDate, leave.toDate);

  for (let date of dates) {
    await Attendance.findOneAndUpdate(
      { employee: leave.employee, date },
      {
        employee: leave.employee,
        date,
        status: "Leave"
      },
      { upsert: true }
    );
  }

  // 🔥 Sandwich Leave
  const prev = new Date(leave.fromDate);
  prev.setDate(prev.getDate() - 1);
  const next = new Date(leave.toDate);
  next.setDate(next.getDate() + 1);

  const prevDate = prev.toISOString().split("T")[0];
  const nextDate = next.toISOString().split("T")[0];

  if (
    (isSunday(prevDate) || await isHoliday(prevDate)) &&
    (isSunday(nextDate) || await isHoliday(nextDate))
  ) {
    await Attendance.updateMany(
      {
        employee: leave.employee,
        date: { $in: [prevDate, nextDate] }
      },
      { status: "Leave" },
      { upsert: true }
    );
  }
};
