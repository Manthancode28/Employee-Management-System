const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, role } = req.body;

    if (!name || !email || !department || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = new Employee({ name, email, department, role });
    await employee.save();

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
