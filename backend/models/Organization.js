const mongoose = require("mongoose");

/* ✅ Leave Policy – Organization Level */
const leavePolicySchema = new mongoose.Schema(
  {
    casual: {
      type: Number,
      default: 0
    },

    sick: {
      type: Number,
      default: 0
    },

    allocationType: {
      type: String,
      enum: ["monthly", "weekly"],
      default: "monthly"
    },

    lastAppliedAt: {
      type: Date
    }
  },
  { _id: false }
);

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    leavePolicy: {
      type: leavePolicySchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
