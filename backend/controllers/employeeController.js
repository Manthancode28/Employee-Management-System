const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const { applyLeavePolicyToEmployee } = require("../utils/applyLeavePolicyToEmployee");

/* ================= ADD EMPLOYEE ================= */
exports.addEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      name,
      email,
      department,
      role,
      managerId,
      dateOfJoining,
      dateOfBirth              // ✅ NEW
    } = req.body;

    if (
      !name ||
      !email ||
      !department ||
      !role ||
      !dateOfJoining ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        message: "All fields including date of birth are required"
      });
    }

    if (!["manager", "employee"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    /* ================= PROBATION CALCULATION ================= */
    const joiningDate = new Date(dateOfJoining);
    const probationMonths = 6;

    const probationEndDate = new Date(joiningDate);
    probationEndDate.setMonth(
      probationEndDate.getMonth() + probationMonths
    );

    /* ================= CREATE EMPLOYEE ================= */
    const employee = await Employee.create({
      name,
      email,
      department,
      role,
      password: hashedPassword,
      managerId: role === "employee" ? managerId || null : null,
      organization: req.user.organizationId,

      dateOfJoining: joiningDate,

      // 🎂 DOB for birthday emails
      dateOfBirth: new Date(dateOfBirth),

      probation: {
        isOnProbation: true,
        durationMonths: probationMonths,
        startDate: joiningDate,
        endDate: probationEndDate,
        status: "ON_PROBATION"
      }
    });

    /* ================= APPLY LEAVE POLICY ================= */
    await applyLeavePolicyToEmployee(employee);

    res.status(201).json({
      message: `${role} added successfully`,
      tempPassword: defaultPassword,
      employeeId: employee._id,
      probationEndDate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET EMPLOYEES ================= */
exports.getEmployees = async (req, res) => {
  try {
    const filter = { organization: req.user.organizationId };

    // Manager sees only employees
    if (req.user.role === "manager") {
      filter.role = "employee";
    }

    const employees = await Employee.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(employees);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET PROBATION EMPLOYEES ================= */
exports.getProbationEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      organization: req.user.organizationId,
      "probation.isOnProbation": true
    }).select("-password");

    res.json(employees);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CONFIRM PROBATION ================= */
exports.confirmProbation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({
      _id: employeeId,
      organization: req.user.organizationId
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.probation.isOnProbation = false;
    employee.probation.status = "CONFIRMED";

    await employee.save();

    res.json({
      message: "Probation completed successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= EXTEND PROBATION ================= */
exports.extendProbation = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { extraMonths } = req.body;

    if (!extraMonths || extraMonths <= 0) {
      return res.status(400).json({ message: "Invalid extra months" });
    }

    const employee = await Employee.findOne({
      _id: employeeId,
      organization: req.user.organizationId
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.probation.endDate.setMonth(
      employee.probation.endDate.getMonth() + extraMonths
    );

    employee.probation.status = "EXTENDED";

    await employee.save();

    res.json({
      message: "Probation extended successfully",
      newProbationEndDate: employee.probation.endDate
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CHANGE EMPLOYEE ROLE ================= */
exports.changeEmployeeRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { employeeId, newRole } = req.body;

    if (!["manager", "employee"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const employee = await Employee.findOne({
      _id: employeeId,
      organization: req.user.organizationId
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.role = newRole;
    await employee.save();

    res.json({
      message: "Role updated successfully",
      employeeId,
      newRole
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= MY LEAVE BALANCE ================= */
exports.getMyLeaveBalance = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId)
      .select("leaveBalance");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee.leaveBalance);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch leave balance"
    });
  }
};
