const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  const emp = await Employee.findOne({ email });
  if (!emp)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, emp.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken({
    userId: emp._id,
    role: "EMPLOYEE",
    organizationId: emp.organization
  });

  res.json({
    message: "Employee login successful",
    token
  });
};
