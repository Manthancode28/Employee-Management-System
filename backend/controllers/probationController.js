const Employee = require("../models/Employee");
const sendEmail = require("../utils/mailer");

exports.completeProbationManually = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (employee.probation.status === "CONFIRMED")
      return res.status(400).json({ message: "Probation already completed" });

    // 🔴 THIS IS WHERE IT FAILS
    await sendEmail({
      to: employee.email,
      subject: "Probation Completed 🎉",
      html: `
        <p>Dear ${employee.name},</p>
        <p>Your probation period has been successfully completed.</p>
        <p>You are now a confirmed employee.</p>
        <br/>
        <p>Regards,<br/>HR Team</p>
      `
    });

    employee.probation.status = "CONFIRMED";
    employee.probation.isOnProbation = false;
    await employee.save();

    res.json({ message: "Probation completed and email sent" });

  } catch (err) {
    console.error("COMPLETE PROBATION ERROR:", err); // 👈 ADD THIS
    res.status(500).json({
      message: err.message || "Failed to complete probation"
    });
  }
};
