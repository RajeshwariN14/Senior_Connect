
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Connectionsenior() {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});

  // Fetch session requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const res = await fetch('http://localhost:3000/api/pending/senior', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      } else {
        console.error('Failed to fetch requests:', data.message);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle scheduling session
  const handleSchedule = async (session) => {
    const date = selectedDate[session._id];
    if (!date) {
      alert('Please select a date and time first.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/sessions/confirm/${session._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scheduledAt: date.toISOString() }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Session scheduled! Meeting link: ${data.meetLink}`);
        fetchRequests(); // Refresh UI after scheduling
      } else {
        throw new Error(data.message || 'Failed to schedule session');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while scheduling the session.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-[#EEEEEE] font-sans">
      <h1 className="text-4xl font-extrabold text-center text-[#222831] mb-10">
        Student <span className="text-[#76ABAE]">Session Requests</span>
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-[#444] text-lg">No session requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {requests.map((session) => (
            <div
              key={session._id}
              className="bg-[#31363F] text-white rounded-xl px-4 py-5 shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 w-64 mx-auto"
            >
              <img
                src={session.student?.profilePicture || '/profile.svg'}
                alt={session.student?.name || 'Student'}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-[#76ABAE] shadow-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/profile.svg';
                }}
              />

              <h2 className="text-base font-semibold text-center mb-1">{session.student?.name}</h2>
              <p className="text-sm text-center text-gray-300 break-words mb-2">
                {session.student?.email}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {session.jeePercentile !== undefined && (
                  <span className="bg-[#76ABAE]/20 text-[#76ABAE] text-xs px-2 py-1 rounded-full border border-[#76ABAE]/50">
                    JEE {session.jeePercentile}%
                  </span>
                )}
                {session.cetPercentile !== undefined && (
                  <span className="bg-[#76ABAE]/20 text-[#76ABAE] text-xs px-2 py-1 rounded-full border border-[#76ABAE]/50">
                    CET {session.cetPercentile}%
                  </span>
                )}
              </div>

              {/* If session is still pending, allow date/time selection */}
              {session.status === 'pending' && (
                <>
                  <div className="flex items-center gap-2 text-sm text-white mb-3">
                    <span className="text-gray-300 font-semibold"></span>
                    <div className="relative z-50 w-full">
                      <DatePicker
                        selected={selectedDate[session._id] || null}
                        onChange={(date) =>
                          setSelectedDate((prev) => ({ ...prev, [session._id]: date }))
                        }
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMM d, yyyy h:mm aa"
                        placeholderText="Select date & time"
                        className="w-full px-3 py-1.5 text-sm bg-white text-black rounded-md shadow focus:outline-none focus:ring-2 focus:ring-[#76ABAE] cursor-pointer"
                        popperPlacement="bottom-start"
                        popperClassName="z-50"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSchedule(session)}
                    className="w-full bg-[#76ABAE] text-white px-4 py-2 rounded-full hover:bg-[#5ea0a2] shadow-md transition duration-200 font-semibold text-sm"
                  >
                     Schedule Session
                  </button>
                </>
              )}
              {session.status === 'confirmed' && session.googleMeetLink && (
  <div className="mt-4 text-center">
    <p className="text-green-400 font-semibold text-sm">Confirmed</p>
    {/* <a
      href={session.googleMeetLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-300 underline break-words text-sm"
    >
      {session.googleMeetLink}
    </a> */}
    {session.scheduledAt && (
      <p className="mt-1 text-xs text-gray-300">
        🗓 {new Date(session.scheduledAt).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </p>
    )}
  </div>
)}


              {/* If session is confirmed, show meeting link */}
              {/* {session.status === 'confirmed' && session.googleMeetLink && (
                <div className="mt-4 text-center">
                  <p className="text-green-400 font-semibold text-sm">✅ Confirmed</p>
                  <a
                    href={session.googleMeetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline break-words text-sm"
                  >
                    {session.googleMeetLink}
                  </a>
                </div>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connectionsenior;
