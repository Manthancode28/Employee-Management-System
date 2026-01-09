const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    date: {
      type: String, 
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
