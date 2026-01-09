const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    workType: {
      type: String,
      enum: ["WFO", "WFH"],
      required: true
    },

    checkIn: {
      time: Date,
      location: {
        lat: Number,
        lng: Number
      }
    },

    checkOut: {
      time: Date,
      location: {
        lat: Number,
        lng: Number
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
