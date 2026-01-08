const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/**
 * REGISTER ORGANIZATION (ADMIN)
 */
exports.registerOrg = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Organization.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = await Organization.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken({
      userId: org._id,
      role: "admin",                 // 👈 unified role name
      organizationId: org._id
    });

    res.status(201).json({
      message: "Organization registered",
      token,
      role: "admin"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN LOGIN
 */
exports.loginOrg = async (req, res) => {
  try {
    const { email, password } = req.body;

    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: org._id,
      role: "admin",
      organizationId: org._id
    });

    res.json({
      message: "Login successful",
      token,
      role: "admin"
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
