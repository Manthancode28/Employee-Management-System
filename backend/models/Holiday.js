const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Holiday", holidaySchema);
