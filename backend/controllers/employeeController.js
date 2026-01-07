const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

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

    
    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    
    const employee = new Employee({
      name,
      email,
      department,
      role,
      password: hashedPassword,
      organization: req.user.organizationId   
    });

    await employee.save();

    res.status(201).json({
      message: "Employee added successfully",
      tempPassword: defaultPassword 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({
      organization: req.user.organizationId
    }).select("-password");

    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


