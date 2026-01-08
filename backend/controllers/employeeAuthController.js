const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emp = await Employee.findOne({ email });
    if (!emp) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
    const token = generateToken({
      userId: emp._id,
      role: emp.role,                  // manager | employee
      organizationId: emp.organization
    });

    res.json({
      message: "Login successful",
      token,
      role: emp.role                   // frontend needs this
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * CHANGE PASSWORD (EMPLOYEE / MANAGER)
 */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const employee = await Employee.findById(req.user.userId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    await employee.save();

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
