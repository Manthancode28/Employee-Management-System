const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

/* ================= ADD EMPLOYEE ================= */
exports.addEmployee = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, department, role, managerId } = req.body;

    if (!name || !email || !department || !role) {
      return res.status(400).json({ message: "All fields are required" });
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

    const employee = await Employee.create({
      name,
      email,
      department,
      role,
      password: hashedPassword,
      managerId: role === "employee" ? managerId || null : null,
      organization: req.user.organizationId
    });

    res.status(201).json({
      message: `${role} added successfully`,
      tempPassword: defaultPassword,
      employeeId: employee._id
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

    const employees = await Employee
      .find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(employees);

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
    res.status(500).json({ message: "Failed to fetch leave balance" });
  }
};

