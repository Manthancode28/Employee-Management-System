const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema(
  {
    total: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 }
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    department: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    /* ✅ Leave balance only (industry practice) */
    leaveBalance: {
      casual: { type: leaveBalanceSchema, default: () => ({}) },
      sick: { type: leaveBalanceSchema, default: () => ({}) }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
