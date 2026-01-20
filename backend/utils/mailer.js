// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail", 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const sendEmail = async ({ to, subject, html }) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html
//   });
// };

// module.exports = sendEmail;


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER, // manthan@creativewebsolution.in
    pass: process.env.EMAIL_PASS  // GoDaddy email password
  }
});

const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Creative Web Solution" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;

