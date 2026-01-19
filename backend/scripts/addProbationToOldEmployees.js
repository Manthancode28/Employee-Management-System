const mongoose = require("mongoose");
const Employee = require("../models/Employee");

require("dotenv").config({
  path: "../.env"
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const employees = await Employee.find({
      probation: { $exists: false }
    }).select("_id createdAt");

    console.log(`Found ${employees.length} old employees`);

    for (const emp of employees) {
      const joiningDate = emp.createdAt;
      const probationMonths = 6;

      const probationEnd = new Date(joiningDate);
      probationEnd.setMonth(probationEnd.getMonth() + probationMonths);

      await Employee.updateOne(
        { _id: emp._id },
        {
          $set: {
            dateOfJoining: joiningDate,
            probation: {
              isOnProbation: false,
              durationMonths: probationMonths,
              startDate: joiningDate,
              endDate: probationEnd,
              status: "CONFIRMED"
            }
          }
        },
        { runValidators: false } // 🔥 THIS IS THE KEY
      );
    }

    console.log("✅ Probation added successfully to old employees");
    process.exit(0);

  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }
})();
