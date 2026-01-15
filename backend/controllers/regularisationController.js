const Regularisation = require("../models/Regularisation");
const Attendance = require("../models/Attendance");

/* ======================================================
   HELPER FUNCTION
====================================================== */
const calculateLateMinutes = (checkInTime) => {
  const officeTime = new Date(checkInTime);
  officeTime.setHours(9, 0, 0, 0);

  if (checkInTime > officeTime) {
    return Math.floor((checkInTime - officeTime) / (1000 * 60));
  }
  return 0;
};

/* ======================================================
   EMPLOYEE: APPLY REGULARISATION
====================================================== */
exports.applyRegularisation = async (req, res) => {
  try {
    // 🔒 SAFETY GUARD (IMPORTANT)
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "Unauthorized user"
      });
    }

    const { date, workType, checkInTime, checkOutTime, reason } = req.body;

    // ✅ BASIC VALIDATION
    if (!date || !reason) {
      return res.status(400).json({
        message: "Date and reason are required"
      });
    }

    if (!checkInTime && !checkOutTime) {
      return res.status(400).json({
        message: "Check-in or check-out time required"
      });
    }

    // ❌ BLOCK FUTURE DATE
    const today = new Date().toISOString().split("T")[0];
    if (date >= today) {
      return res.status(400).json({
        message: "Only past date regularisation allowed"
      });
    }

    // ✅ CONVERT STRING → DATE
    const checkInDate = checkInTime
      ? new Date(`${date}T${checkInTime}`)
      : undefined;

    const checkOutDate = checkOutTime
      ? new Date(`${date}T${checkOutTime}`)
      : undefined;

    const reg = await Regularisation.create({
      employee: req.user.userId, // ✅ FIXED
      date,
      workType: workType || "WFO",
      checkInTime: checkInDate,
      checkOutTime: checkOutDate,
      reason
    });

    res.status(201).json({
      message: "Regularisation request submitted successfully",
      reg
    });

  } catch (error) {
    console.error("REGULARISATION ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Regularisation already applied for this date"
      });
    }

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

/* ======================================================
   EMPLOYEE: VIEW OWN REGULARISATIONS
====================================================== */
exports.getMyRegularisations = async (req, res) => {
  try {
    const data = await Regularisation.find({
      employee: req.user.userId // ✅ FIXED
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   MANAGER / ADMIN: VIEW ALL REGULARISATIONS
====================================================== */
exports.getAllRegularisations = async (req, res) => {
  try {
    const data = await Regularisation.find()
      .populate("employee", "name email")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   MANAGER / ADMIN: APPROVE / REJECT
====================================================== */
exports.updateRegularisationStatus = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "Unauthorized user"
      });
    }

    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reg = await Regularisation.findById(req.params.id);
    if (!reg) {
      return res.status(404).json({ message: "Regularisation not found" });
    }

    if (reg.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    reg.status = status;
    reg.approvedBy = req.user.userId; // ✅ FIXED
    await reg.save();

    // 🔥 UPDATE ATTENDANCE IF APPROVED
    if (status === "approved") {
      const lateMinutes = reg.checkInTime
        ? calculateLateMinutes(reg.checkInTime)
        : 0;

      const attendanceStatus =
        lateMinutes > 0 ? "Late" : "Present";

      await Attendance.findOneAndUpdate(
        {
          employee: reg.employee,
          date: reg.date
        },
        {
          employee: reg.employee,
          date: reg.date,
          workType: reg.workType,
          checkIn: reg.checkInTime ? { time: reg.checkInTime } : undefined,
          checkOut: reg.checkOutTime ? { time: reg.checkOutTime } : undefined,
          status: attendanceStatus,
          lateMinutes
        },
        { upsert: true }
      );
    }

    res.json({
      message: `Regularisation ${status} successfully`
    });

  } catch (error) {
    console.error("APPROVAL ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
