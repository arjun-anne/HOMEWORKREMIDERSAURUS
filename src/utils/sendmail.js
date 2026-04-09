const nodemailer = require("nodemailer");

const sendmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text
    });

    console.log("mail sent to", to);
  } catch (error) {
    console.log("nodemailer error", error);
  }
};

module.exports = sendmail;