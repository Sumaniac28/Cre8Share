const nodeMailer = require("nodemailer");
require('dotenv').config();

const transporter = nodeMailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.NODE_MAILER_USERNAME,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("error in transporter configuration ", error);
  } else {
    console.log("success in transporter configuration ", success);
  }
});

const sendmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_USERNAME,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending mail ", error);
  }
};

module.exports = sendmail;
