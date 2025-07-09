// utils/createCalendarEvent.js
import { google } from 'googleapis';
import oauth2Client from './googleAuthClient.js';

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createCalendarEvent = async ({ summary, description, startTime, endTime, attendeeEmails }) => {
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Kolkata',
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      attendees: attendeeEmails.map(email => ({ email })),
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // automatically sends email invites
    });

    return response.data;
  } catch (error) {
    console.error('Google Calendar API error:', error);
    throw error;
  }
};

export default createCalendarEvent;
