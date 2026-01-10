const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  reason: String
});

module.exports = mongoose.model("Holiday", holidaySchema);
