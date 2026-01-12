const Holiday = require("../models/Holiday");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.addHoliday = async (req, res) => {
  const { date, name } = req.body;

  const exists = await Holiday.findOne({ date });
  if (exists) {
    return res
      .status(400)
      .json({ message: "Holiday already exists" });
  }

  const holiday = await Holiday.create({ date, name });

  // Auto-mark attendance for all employees
  const employees = await Employee.find();

  const records = employees.map(emp => ({
    employee: emp._id,
    date,
    status: "Holiday"
  }));

  await Attendance.insertMany(records, { ordered: false });

  res.json({ message: "Holiday added successfully" });
};

exports.getHolidays = async (req, res) => {
  const holidays = await Holiday.find().sort({ date: 1 });
  res.json(holidays);
};
