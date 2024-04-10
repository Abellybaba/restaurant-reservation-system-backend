const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
// const transporter = nodemailer.createTransport({
//   host: "smtp.titan.email", // SMTP server hostname
//   port: 587, // Port for SMTP (usually 587 for TLS or 465 for SSL)
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "", // Your SMTP username
//     pass: "", // Your SMTP password
//   },
// });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server hostname
  port: process.env.SMTP_PORT, // Port for SMTP (usually 587 for TLS or 465 for SSL)
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME, // Your SMTP username
    pass: process.env.SMTP_PASSWORD, // Your SMTP password
  },
});

// Send email
const sendEmail = async (to, subject, text) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "admin@abelokoh.com", // Sender address
      to: to, // Recipient's email address
      subject: subject, // Subject line
      text: text, // Plain text body
    });
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = sendEmail;
