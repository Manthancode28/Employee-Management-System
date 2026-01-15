const Organization = require("../models/Organization");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


/* ================= REGISTER ORG ================= */
exports.registerOrg = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Organization.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const org = await Organization.create({
      name,
      email,
      password: hashed,
      leavePolicy: {
        casual: 0,
        sick: 0,
        frequency: "monthly"
      }
    });

    const token = generateToken({
      userId: org._id,
      role: "admin",
      organizationId: org._id
    });

    res.status(201).json({ token, role: "admin" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ORG ================= */
exports.loginOrg = async (req, res) => {
  try {
    const { email, password } = req.body;

    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, org.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: org._id,
      role: "admin",
      organizationId: org._id
    });

    res.json({ token, role: "admin" });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ================= SET LEAVE POLICY ================= */
exports.setLeavePolicy = async (req, res) => {
  try {
    const { casual, sick, frequency } = req.body;

    const org = await Organization.findById(req.user.organizationId);

    org.leavePolicy = {
      casual,
      sick,
      frequency,
      lastAppliedAt: null
    };

    await org.save();

    res.json({ message: "Leave policy updated", leavePolicy: org.leavePolicy });
  } catch (err) {
    res.status(500).json({ message: "Failed to set leave policy" });
  }
};

/* ================= APPLY LEAVE POLICY ================= */
exports.applyLeavePolicy = async (req, res) => {
  try {
    const org = await Organization.findById(req.user.organizationId);
    const { casual, sick } = org.leavePolicy;

    const employees = await Employee.find({
      organization: org._id,
      role: "employee"
    });

    for (const emp of employees) {
      emp.leaveBalance.casual.total += casual;
      emp.leaveBalance.casual.remaining += casual;

      emp.leaveBalance.sick.total += sick;
      emp.leaveBalance.sick.remaining += sick;

      await emp.save();
    }

    org.leavePolicy.lastAppliedAt = new Date();
    await org.save();

    res.json({ message: "Leave policy applied to all employees" });
  } catch (err) {
    res.status(500).json({ message: "Failed to apply leave policy" });
  }
};