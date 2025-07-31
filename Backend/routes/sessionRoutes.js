// import express from 'express';
// import SessionRequest from '../models/session.js';
// import createCalendarEvent from '../utils/createCalenderEvent.js';
// import sendEmail from '../utils/sendEmail.js';

// import User from '../models/user.js';
// import Senior from '../models/senior.js';

// const router = express.Router();

// // router.post('/confirm/:id', async (req, res) => {
// //   const sessionId = req.params.id;
// //   const { scheduledAt } = req.body;

// //   try {
// //     const session = await SessionRequest.findById(sessionId)
// //       .populate('student')
// //       .populate({
// //         path: 'senior',
// //         populate: { path: 'name' } // Senior.name refers to User model
// //       });

// //     if (!session) return res.status(404).send("Session not found");

// //     // Assume 1 hour duration
// //     const startTime = new Date(scheduledAt);
// //     const endTime = new Date(new Date(scheduledAt).getTime() + 60 * 60 * 1000);

// //     const calendarEvent = await createCalendarEvent({
// //       summary: 'Senior Connect Mentorship Session',
// //       description: `Exam: ${session.examType}, Percentile: ${session.percentile}`,
// //       startTime,
// //       endTime,
// //       attendeeEmails: [session.student.email, session.senior.name.email],
// //     });

// //     session.status = 'confirmed';
// //     session.scheduledAt = scheduledAt;
// //     session.googleMeetLink = calendarEvent.hangoutLink;
// //     await session.save();

// //     await sendEmail(
// //       session.student.email,
// //       'Your session has been scheduled!',
// //       `
// //         <h2>Your session has been confirmed</h2>
// //         <p><strong>Date & Time:</strong> ${startTime.toLocaleString('en-IN')}</p>
// //         <p><strong>Google Meet Link:</strong> <a href="${calendarEvent.hangoutLink}">${calendarEvent.hangoutLink}</a></p>
// //       `
// //     );

// //     res.send({
// //       message: 'Session confirmed and calendar event created',
// //       meetLink: calendarEvent.hangoutLink
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Something went wrong");
// //   }
// // });

// // export default router;

// router.post('/confirm/:id', async (req, res) => {
//   const sessionId = req.params.id;
//   const { scheduledAt } = req.body;

//   try {
//     console.log(" Fetching session...");
//     const session = await SessionRequest.findById(sessionId)
//       .populate('student')
//       .populate({ path: 'senior', populate: { path: 'name' } });

//     if (!session) {
//       console.error("Session not found.");
//       return res.status(404).send("Session not found");
//     }

//     console.log("Session loaded:", session);

//     const startTime = new Date(scheduledAt);
//     const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

//     const calendarEvent = await createCalendarEvent({
//       summary: 'Senior Connect Session',

//       description: ` JEEPercentile: ${session.jeePercentile}, CETPercentile: ${session.cetPercentile}`,
//       startTime,
//       endTime,
//       attendeeEmails: [
//         session.student.email,
//         session.senior.name.email
//       ],
//     });

//     console.log(" Event created:", calendarEvent);

//     session.status = 'confirmed';
//     session.scheduledAt = scheduledAt;
//     session.googleMeetLink = calendarEvent.hangoutLink;
//     await session.save();
//     console.log(" Session updated in DB");

//     await sendEmail(
//       session.student.email,
//       " Your Session is Confirmed",
//       `<h2>Your session is confirmed</h2>
//        <p>Date: ${startTime.toLocaleString()}</p>
//        <p>Meet Link: <a href="${calendarEvent.hangoutLink}">${calendarEvent.hangoutLink}</a></p>`
//     );

//     console.log(" Email sent to student");

//     res.send({
//       message: "Session confirmed successfully",
//       meetLink: calendarEvent.hangoutLink,
//     });

//   } catch (error) {
//     console.error(" Full error:", error);
//     res.status(500).send(` Something went wrong: ${error.message}`);
//   }
// });

// export default router;


import express from 'express';
import SessionRequest from '../models/session.js';
import createCalendarEvent from '../utils/createCalenderEvent.js';
import sendEmail from '../utils/sendEmail.js';

import User from '../models/user.js';
import Senior from '../models/senior.js';

const router = express.Router();

// router.post('/confirm/:id', async (req, res) => {
//   const sessionId = req.params.id;
//   const { scheduledAt } = req.body;

//   try {
//     const session = await SessionRequest.findById(sessionId)
//       .populate('student')
//       .populate({
//         path: 'senior',
//         populate: { path: 'name' } // Senior.name refers to User model
//       });

//     if (!session) return res.status(404).send("Session not found");

//     // Assume 1 hour duration
//     const startTime = new Date(scheduledAt);
//     const endTime = new Date(new Date(scheduledAt).getTime() + 60 * 60 * 1000);

//     const calendarEvent = await createCalendarEvent({
//       summary: 'Senior Connect Mentorship Session',
//       description: `Exam: ${session.examType}, Percentile: ${session.percentile}`,
//       startTime,
//       endTime,
//       attendeeEmails: [session.student.email, session.senior.name.email],
//     });

//     session.status = 'confirmed';
//     session.scheduledAt = scheduledAt;
//     session.googleMeetLink = calendarEvent.hangoutLink;
//     await session.save();

//     await sendEmail(
//       session.student.email,
//       'Your session has been scheduled!',
//       `
//         <h2>Your session has been confirmed</h2>
//         <p><strong>Date & Time:</strong> ${startTime.toLocaleString('en-IN')}</p>
//         <p><strong>Google Meet Link:</strong> <a href="${calendarEvent.hangoutLink}">${calendarEvent.hangoutLink}</a></p>
//       `
//     );

//     res.send({
//       message: 'Session confirmed and calendar event created',
//       meetLink: calendarEvent.hangoutLink
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong");
//   }
// });

// export default router;

router.post('/confirm/:id', async (req, res) => {
  const sessionId = req.params.id;
  const { scheduledAt } = req.body;

  try {
    console.log(" Fetching session...");
    const session = await SessionRequest.findById(sessionId)
      .populate('student')
      .populate({ path: 'senior', populate: { path: 'name' } });

    if (!session) {
      console.error("Session not found.");
      return res.status(404).send("Session not found");
    }

    console.log("Session loaded:", session);

    const startTime = new Date(scheduledAt);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const calendarEvent = await createCalendarEvent({
      summary: 'Senior Connect Session',

      description: ` Mentorship Session with ${session.senior.name.name} is scheduled.`,
      startTime,
      endTime,
      attendeeEmails: [
        session.student.email,
        session.senior.name.email
      ],
    });

    console.log(" Event created:", calendarEvent);

    session.status = 'confirmed';
    session.scheduledAt = scheduledAt;
    session.googleMeetLink = calendarEvent.hangoutLink;
    await session.save();
    console.log(" Session updated in DB");

    await sendEmail(
      session.student.email,
      " Your Mentorship Session is Confirmed. Kindly check the time and meet link.",
      `<h2>Your session is confirmed</h2>
       <p>Date: ${startTime.toLocaleString()}</p>
       <p>Meet Link: <a href="${calendarEvent.hangoutLink}">${calendarEvent.hangoutLink}</a></p>`
    );

    console.log(" Email sent to student");

    res.send({
      message: "Session confirmed successfully",
      meetLink: calendarEvent.hangoutLink,
    });

  } catch (error) {
    console.error(" Full error:", error);
    res.status(500).send(` Something went wrong: ${error.message}`);
  }
});

export default router;


