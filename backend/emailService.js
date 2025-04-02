const nodemailer = require("nodemailer");

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: "jovinchoondal2022@gmail.com", // Replace with your email
    pass: "123456", // Generate an app password for security
  },
});

/**
 * Sends an email notification to the user.
 * @param {string} email - User's email address.
 * @param {string} foodName - The name of the food item.
 * @param {string} expiryDate - Expiry date of the food item.
 */
const sendExpiryNotification = async (email, foodName, expiryDate) => {
  try {
    const mailOptions = {
      from: "jovinchoondal2022@gmail.com",
      to: email,
      subject: "Food Expiry Alert! 🛑",
      text: `Your food item "${foodName}" is about to expire on ${expiryDate}. Please use it soon!`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email} for ${foodName}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendExpiryNotification;
