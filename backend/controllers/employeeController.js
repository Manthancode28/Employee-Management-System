const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

/**
 * ADMIN ONLY
 * Add Employee or Manager
 */
exports.addEmployee = async (req, res) => {
  try {
    // 🔒 Extra safety (even if middleware exists)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, department, role, managerId } = req.body;

    if (!name || !email || !department || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ❌ Admin cannot create another admin here
    if (!["manager", "employee"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Default password
    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const employee = new Employee({
      name,
      email,
      department,
      role,
      password: hashedPassword,

      // assign manager only if role is employee
      managerId: role === "employee" ? managerId || null : null,

      organization: req.user.organizationId
    });

    await employee.save();

    res.status(201).json({
      message: `${role} added successfully`,
      tempPassword: defaultPassword
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN → Get all employees & managers
 * MANAGER → Get only employees
 */
exports.getEmployees = async (req, res) => {
  try {
    let filter = { organization: req.user.organizationId };

    // 👨‍💼 Manager sees only employees
    if (req.user.role === "manager") {
      filter.role = "employee";
    }

    const employees = await Employee.find(filter).select("-password");
    res.json(employees);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
