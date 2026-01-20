const cron = require("node-cron");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/mailer");


const today = () => {
  const d = new Date();
  d.setHours(0,0,0,0);
  return d;
};


cron.schedule("0 9 * * *", async () => {
  try {
    const employees = await Employee.find({
      probationEndDate: today()
    });

    for (const emp of employees) {
      await sendEmail({
        to: emp.email,
        subject: "Congratulations on Completing Probation 🎉",
        html: `
          <p>Dear ${emp.fullName},</p>
          <p>Congratulations on successfully completing your probation period.</p>
          <p>We look forward to your continued contributions.</p>
          <br/>
          <p>Best Regards,<br/>HR Team</p>
        `
      });
    }
  } catch (err) {
    console.error("Probation mail error:", err);
  }
});

