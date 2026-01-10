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
      },
      city: String,
    },

    checkOut: {
      time: Date,
      location: {
        lat: Number,
        lng: Number
      },
      city: String,
    },

    // 🔥 NEW FIELDS
    status: {
      type: String,
      enum: [
        "Present",
        "Late",
        "Absent",
        "Holiday",
        "WeeklyOff",
        "Leave"
      ],
      default: "Absent"
    },

    lateMinutes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1,  date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
