import React from 'react';

const MyAppointments = () => {
  // TODO: Replace with API call to fetch user appointments
  const appointments = [
    { doctor: 'Dr. John Doe', speciality: 'Cardiology', date: 'Mon, 08 Sep', time: '10:00 AM', status: 'Confirmed' },
    { doctor: 'Dr. Jane Smith', speciality: 'Dermatology', date: 'Tue, 09 Sep', time: '02:00 PM', status: 'Pending' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-gray-600">You have no upcoming appointments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt, index) => (
            <div key={index} className="border rounded-lg p-4 shadow hover:shadow-md transition">
              <p className="text-gray-900 font-semibold">{appt.doctor}</p>
              <p className="text-gray-600 text-sm">{appt.speciality}</p>
              <p className="text-gray-600">{appt.date} at {appt.time}</p>
              <p className={`mt-2 font-medium ${appt.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                {appt.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
