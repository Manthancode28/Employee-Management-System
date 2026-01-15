const mongoose = require("mongoose");

const regularisationSchema = new mongoose.Schema(
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
      default: "WFO"
    },

    checkInTime: Date,
    checkOutTime: Date,

    reason: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    }
  },
  { timestamps: true }
);

regularisationSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Regularisation", regularisationSchema);
