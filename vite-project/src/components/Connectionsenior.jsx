import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const dummyRequests = [
  {
    id: 1,
    name: 'Riya Kulkarni',
    email: 'riya.kulkarni@example.com',
    jeePercentile: '92.15',
    cetPercentile: '95.60',
    studentQuery: 'I want guidance on choosing the right engineering branch.',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    status: 'pending',
  },
];

function Connectionsenior() {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [schedulingStatus, setSchedulingStatus] = useState({});

  useEffect(() => {
    setRequests(dummyRequests); // Replace with backend fetch later
  }, []);

  const handleSchedule = async (student) => {
    const date = selectedDate[student.id];
    if (!date) {
      alert('Please select a date and time first.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/schedule-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          studentEmail: student.email,
          jeePercentile: student.jeePercentile,
          cetPercentile: student.cetPercentile,
          studentQuery: student.studentQuery,
          seniorName: "Sneha Patil",
          seniorEmail: "sneha@example.com",
          dateTime: date.toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSchedulingStatus((prev) => ({
          ...prev,
          [student.id]: 'success',
        }));
        alert(`✅ Session scheduled! Meeting link: ${data.meetLink}`);
      } else {
        throw new Error(data.message || 'Failed to schedule session');
      }
    } catch (error) {
      console.error(error);
      setSchedulingStatus((prev) => ({
        ...prev,
        [student.id]: 'error',
      }));
      alert('❌ An error occurred while scheduling the session.');
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#EEEEEE] via-[#f9f9f9] to-[#f4fdfd] font-sans">
      <h1 className="text-4xl font-extrabold text-center text-[#222831] mb-10">
         Student <span className="text-[#76ABAE]">Session Requests</span>
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-[#666] text-lg">
          No session requests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((student) => (
            <div
              key={student.id}
              className="bg-white text-[#222831] rounded-3xl shadow-xl p-6 transition-transform hover:-translate-y-1 duration-300 border border-[#d0d0d0]"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow ring-4 ring-[#76ABAE]"
              />
              <h2 className="text-xl font-bold text-center text-[#31363F]">{student.name}</h2>

              <div className="text-[#555] mt-3 space-y-1 text-sm text-center">
                <p>📧 <span className="font-medium">Email:</span> {student.email}</p>
                <p>📊 <span className="font-medium">JEE:</span> {student.jeePercentile}%</p>
                <p>📈 <span className="font-medium">CET:</span> {student.cetPercentile}%</p>
              </div>

              <div className="bg-[#76ABAE]/10 text-[#222831] rounded-md p-3 mt-4 text-sm shadow-sm">
                <strong>📝 Query:</strong> <br /> {student.studentQuery}
              </div>

              <div className="mt-4 text-left">
                <p className="text-sm mb-1 text-[#444] font-semibold">📅 Select Date & Time:</p>
                <DatePicker
                  selected={selectedDate[student.id] || null}
                  onChange={(date) => setSelectedDate({ ...selectedDate, [student.id]: date })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Click to select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [20, 10],
                      },
                    },
                  ]}
                />
              </div>

              <button
                onClick={() => handleSchedule(student)}
                className="mt-5 w-full bg-[#222831] text-white px-4 py-2 rounded-full hover:bg-[#5a9295] shadow-md transition duration-200 font-semibold text-sm"
              >
                ✅ Schedule Session
              </button>

              {schedulingStatus[student.id] === 'success' && (
                <p className="mt-3 text-green-600 font-semibold text-sm text-center">
                  Session scheduled ✅
                </p>
              )}
              {schedulingStatus[student.id] === 'error' && (
                <p className="mt-3 text-red-600 font-semibold text-sm text-center">
                  Failed to schedule ❌
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connectionsenior;
