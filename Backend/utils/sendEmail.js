

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // false for 587
//   auth: {
//     user: process.env.SENDER_EMAIL,
//     pass: process.env.SENDER_PASSWORD,
//   },
// });

// const sendEmail = async (to, subject, html , attachments=[]) => {
//   const mailOptions = {
//     from: process.env.SENDER_EMAIL,
//     to,
//     subject,
//     html,
//     attachments,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error('Nodemailer error:', error);
//   }
// };

// export default sendEmail;



import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html, attachments = []) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // must be verified in SendGrid
    subject,
    html,
    attachments: attachments.map((file) => ({
      content: file.content, // already base64 encoded
      filename: file.filename,
      type: file.contentType || "application/octet-stream",
      disposition: "attachment",
    })),
  };

  try {
    const response = await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
    return response;
  } catch (error) {
    console.error(
      "SendGrid error:",
      error.response?.body || error.message
    );
    throw error; // important so route knows it failed
  }
};

export default sendEmail;