const Organization = require("../models/Organization");

module.exports.applyLeavePolicyToEmployee = async (employee) => {
  const org = await Organization.findById(employee.organization);

  if (!org || !org.leavePolicy) return;

  const { casual, sick } = org.leavePolicy;

  // Apply casual leave
  employee.leaveBalance.casual.total += casual;
  employee.leaveBalance.casual.remaining += casual;

  // Apply sick leave
  employee.leaveBalance.sick.total += sick;
  employee.leaveBalance.sick.remaining += sick;

  await employee.save();
};
