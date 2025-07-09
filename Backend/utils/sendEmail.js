

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
 
    host: 'smtp.gmail.com',
    port: 465, // Port for secure SMTP
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD, // Use an app password if 2FA is enabled
  },
});
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Nodemailer error:', error);
  }
};

export default sendEmail;