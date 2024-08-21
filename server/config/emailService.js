const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  auth: {},
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
    from:
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
