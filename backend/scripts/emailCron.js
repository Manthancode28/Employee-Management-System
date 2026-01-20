const cron = require("node-cron");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/mailer");

cron.schedule("0 9 * * *", async () => {
  try {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const currentYear = today.getFullYear();

    /* ================= PROBATION EMAIL ================= */
    const probationEmployees = await Employee.find({
      "probation.endDate": {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      },
      "probation.status": "ON_PROBATION"
    });

    for (const emp of probationEmployees) {
      await sendEmail({
        to: emp.email,
        subject: "Probation Period Completed 🎉",
        html: `
          <p>Dear ${emp.name},</p>
          <p>Congratulations! Your probation period has been successfully completed.</p>
          <p>You are now a confirmed employee.</p>
          <br/>
          <p>Regards,<br/>HR Team</p>
        `
      });

      emp.probation.status = "CONFIRMED";
      emp.probation.isOnProbation = false;
      await emp.save();
    }

    /* ================= 🎂 BIRTHDAY EMAIL ================= */
    const birthdayEmployees = await Employee.find({
      dateOfBirth: { $exists: true },
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, todayDate] },
          { $eq: [{ $month: "$dateOfBirth" }, todayMonth] }
        ]
      }
    });

    for (const emp of birthdayEmployees) {
      if (emp.birthdayMailLastSentYear === currentYear) continue;

      await sendEmail({
        to: emp.email,
        subject: "🎂 Happy Birthday from the Team!",
        html: `
          <p>Dear ${emp.name},</p>
          <p>🎉 Wishing you a very Happy Birthday! 🎉</p>
          <p>May your year ahead be filled with success and happiness.</p>
          <br/>
          <p>Warm Regards,<br/>HR Team</p>
        `
      });

      emp.birthdayMailLastSentYear = currentYear;
      await emp.save();
    }

  } catch (err) {
    console.error("Email cron error:", err);
  }
});
