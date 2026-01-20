require("dotenv").config();
const sendEmail = require("../utils/mailer");

(async () => {
  await sendEmail({
    to: "manthan.nimon28@gmail.com",
    subject: "Nodemailer Test",
    html: "<h3>Email system working successfully ✅</h3>"
  });

  console.log("Test email sent");
})();
