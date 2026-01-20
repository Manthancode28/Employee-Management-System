const mongoose = require("mongoose");

/* ================= LEAVE BALANCE SUB-SCHEMA ================= */
const leaveBalanceSchema = new mongoose.Schema(
  {
    total: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 }
  },
  { _id: false }
);

/* ================= PROBATION SUB-SCHEMA ================= */
const probationSchema = new mongoose.Schema(
  {
    isOnProbation: {
      type: Boolean,
      default: true
    },

    durationMonths: {
      type: Number,
      default: 6
    },

    startDate: {
      type: Date
    },

    endDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["ON_PROBATION", "CONFIRMED", "EXTENDED"],
      default: "ON_PROBATION"
    }
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

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

    /* ================= IMPORTANT DATES ================= */

    // Date employee joined the organization
    dateOfJoining: {
      type: Date,
      required: true
    },

    // 🎂 Date of Birth (used for birthday emails)
    dateOfBirth: {
      type: Date,
      required: true
    },

    // 🛑 Prevent duplicate birthday emails in same year
    birthdayMailLastSentYear: {
      type: Number,
      default: null
    },

    /* ================= PROBATION DETAILS ================= */
    probation: {
      type: probationSchema,
      default: () => ({})
    },

    /* ================= LEAVE BALANCE ================= */
    leaveBalance: {
      casual: { type: leaveBalanceSchema, default: () => ({}) },
      sick: { type: leaveBalanceSchema, default: () => ({}) }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
