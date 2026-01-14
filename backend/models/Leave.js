const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    dates: {
      type: [String], // YYYY-MM-DD
      required: true
    },

    leaveType: {
      type: String,
      enum: ["Casual", "Sick", "Sandwich"],
      required: true
    },

    totalDays: {
      type: Number,
      required: true
    },

    reason: {
      type: String
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
