const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    fromDate: {
      type: String,
      required: true
    },

    toDate: {
      type: String,
      required: true
    },

    leaveType: {
      type: String,
      enum: ["Casual", "Sick"],
      required: true
    },

    totalDays: {
      type: Number,
      default: 0
    },

    isSandwich: {
      type: Boolean,
      default: false
    },

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);
