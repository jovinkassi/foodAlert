const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

const sendNotification = (email, itemName, expiryDate) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Food Expiry Alert",
    text: `Your food item "${itemName}" is expiring on ${expiryDate}. Please use or donate it.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("Error sending email:", err);
    else console.log("Email sent:", info.response);
  });
};

module.exports = { sendNotification };
