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
  try {
    const { fromDate, toDate, reason, leaveType } = req.body;

    if (!leaveType) {
      return res.status(400).json({ message: "Leave type required" });
    }

    const dates = getDateRange(fromDate, toDate);

    let totalDays = 0;
    let isSandwich = false;

    // Check sandwich (Fri + Mon)
    const prev = new Date(fromDate);
    prev.setDate(prev.getDate() - 1);
    const next = new Date(toDate);
    next.setDate(next.getDate() + 1);

    const prevDate = prev.toISOString().split("T")[0];
    const nextDate = next.toISOString().split("T")[0];

    if (
      (isSunday(prevDate) || await isHoliday(prevDate)) &&
      (isSunday(nextDate) || await isHoliday(nextDate))
    ) {
      isSandwich = true;
    }

    if (isSandwich) {
      totalDays = dates.length + 2; // Sat + Sun
    } else {
      // Exclude Sundays & holidays
      for (let d of dates) {
        if (!(isSunday(d) || await isHoliday(d))) {
          totalDays++;
        }
      }
    }

    const leave = await Leave.create({
      employee: req.user.userId,
      fromDate,
      toDate,
      reason,
      leaveType,
      totalDays,
      isSandwich
    });

    res.json({ message: "Leave applied", leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Leave apply failed" });
  }
};

/* ================= MANAGER VIEW ================= */
exports.getManagerLeaves = async (req, res) => {
  const manager = await Employee.findById(req.user.userId);

  if (!manager || manager.role !== "manager") {
    return res.status(403).json({ message: "Access denied" });
  }

  const employees = await Employee.find({
    department: manager.department,
    role: "employee"
  }).select("_id");

  const employeeIds = employees.map(e => e._id);

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

  // Mark applied dates
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

  // Sandwich weekend/holiday
  if (leave.isSandwich) {
    const prev = new Date(leave.fromDate);
    prev.setDate(prev.getDate() - 1);
    const next = new Date(leave.toDate);
    next.setDate(next.getDate() + 1);

    const extraDates = [
      prev.toISOString().split("T")[0],
      next.toISOString().split("T")[0]
    ];

    for (let date of extraDates) {
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
  }
};
