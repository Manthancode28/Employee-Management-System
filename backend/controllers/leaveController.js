const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { isWeeklyOff, getBetweenDates } = require("../utils/leaveUtils");

/* ================= APPLY LEAVE ================= */
exports.applyLeave = async (req, res) => {
  try {
    const { dates, reason, leaveType } = req.body;
    const employeeId = req.user.userId;

    if (!dates || dates.length === 0) {
      return res.status(400).json({ message: "Leave dates required" });
    }

    if (!leaveType) {
      return res.status(400).json({ message: "Leave type required" });
    }

    // Remove duplicates & sort
    const newDates = [...new Set(dates)].sort();

    // Fetch existing pending / approved leaves
    const pastLeaves = await Leave.find({
      employee: employeeId,
      status: { $in: ["Pending", "Approved"] }
    });

    // Combine dates to detect sandwich
    const allDates = [
      ...new Set([...newDates, ...pastLeaves.flatMap(l => l.dates)])
    ].sort();

    const isWorkingDay = (d) => !isWeeklyOff(d);

    let totalDays = newDates.length;
    let isSandwich = false;

    for (let i = 0; i < allDates.length - 1; i++) {
      let leaveCount = 1;
      let weeklyOffCount = 0;
      let endIndex = i;

      for (let j = i + 1; j < allDates.length; j++) {
        const between = getBetweenDates(allDates[j - 1], allDates[j]);

        // If working day exists between → stop
        if (between.some(d => isWorkingDay(d))) break;

        weeklyOffCount += between.filter(d => isWeeklyOff(d)).length;
        leaveCount++;
        endIndex = j;
      }

      const segmentDates = allDates.slice(i, endIndex + 1);
      const involvesNewLeave = newDates.some(d =>
        segmentDates.includes(d)
      );

      // Sandwich only if new leave is part of chain
      if (leaveCount >= 2 && weeklyOffCount > 0 && involvesNewLeave) {
        isSandwich = true;
        totalDays = leaveCount + weeklyOffCount;
        break;
      }
    }

    const finalLeaveType = isSandwich ? "Sandwich" : leaveType;

    const leave = await Leave.create({
      employee: employeeId,
      dates: newDates,
      totalDays,
      leaveType: finalLeaveType,
      reason
    });

    res.json({
      message: "Leave applied successfully",
      leave
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Leave apply failed" });
  }
};

/* ================= MANAGER VIEW ================= */
exports.getManagerLeaves = async (req, res) => {
  try {
    const manager = await Employee.findById(req.user.userId);

    if (!manager || manager.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    const employees = await Employee.find({
      department: manager.department,
      role: "employee"
    }).select("_id");

    const leaves = await Leave.find({
      employee: { $in: employees.map(e => e._id) }
    }).populate("employee", "name email department");

    res.json(leaves);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

/* ================= APPROVE / REJECT ================= */
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    if (status === "Approved") {
      const employee = await Employee.findById(leave.employee);

     
      const leaveKey =
        leave.leaveType === "Sandwich"
          ? "casual"
          : leave.leaveType.toLowerCase();

      if (employee.leaveBalance[leaveKey].remaining < leave.totalDays) {
        return res.status(400).json({
          message: "Insufficient leave balance"
        });
      }

      employee.leaveBalance[leaveKey].used += leave.totalDays;
      employee.leaveBalance[leaveKey].remaining -= leave.totalDays;

      await employee.save();
      await applyLeaveToAttendance(leave);
    }

    leave.status = status;
    leave.approvedBy = req.user.userId;
    await leave.save();

    res.json({ message: `Leave ${status} successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update leave status" });
  }
};


/* ================= APPLY LEAVE TO ATTENDANCE ================= */
const applyLeaveToAttendance = async (leave) => {
  for (const date of leave.dates) {
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
};


/* ================= EMPLOYEE LEAVES ================= */
exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({
    employee: req.user.userId
  }).sort({ createdAt: -1 });

  res.json(leaves);
};

