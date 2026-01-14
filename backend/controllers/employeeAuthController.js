const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/* ================= EMPLOYEE / MANAGER LOGIN ================= */
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = generateToken({
      userId: employee._id,
      role: employee.role,                 // employee | manager
      organizationId: employee.organization
    });

    res.json({
      message: "Login successful",
      token,
      role: employee.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ================= CHANGE PASSWORD ================= */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const employee = await Employee.findById(req.user.userId);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Old password incorrect"
      });
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    await employee.save();

    res.json({
      message: "Password changed successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};
