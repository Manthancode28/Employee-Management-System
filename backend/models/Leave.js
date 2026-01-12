const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    fromDate: {
      type: String, // YYYY-MM-DD
      required: true
    },

    toDate: {
      type: String, // YYYY-MM-DD
      required: true
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

