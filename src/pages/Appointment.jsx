import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({}); // simulate booked slots

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Fetch doctor info
  useEffect(() => {
    if (doctors.length) {
      const info = doctors.find(doc => doc._id === docId);
      setDocInfo(info);
    }
  }, [doctors, docId]);

  // Generate slots grouped by day+date
  useEffect(() => {
    if (docInfo) generateAvailableSlots();
  }, [docInfo]);

  const generateAvailableSlots = () => {
    const today = new Date();
    let slotsByDay = {};

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = daysOfWeek[date.getDay()];
      const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const dayLabel = `${dayName} ${formattedDate}`;

      let startTime = new Date(date);
      if (i === 0) {
        startTime.setHours(startTime.getHours() > 10 ? startTime.getHours() + 1 : 10);
        startTime.setMinutes(startTime.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const endTime = new Date(date);
      endTime.setHours(21, 0, 0, 0);

      let slots = [];
      while (startTime < endTime) {
        const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isBooked = bookedSlots[dayLabel]?.includes(timeString) || false;

        slots.push({
          datetime: new Date(startTime),
          time: timeString,
          booked: isBooked
        });

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      slotsByDay[dayLabel] = slots;
    }

    setDocSlots(slotsByDay);
    setSelectedDay(Object.keys(slotsByDay)[0]);
  };

  const handleBooking = () => {
    if (!selectedSlot) return alert("Please select a slot.");
    if (!paymentMethod) return alert("Please select a payment method.");
    if (selectedSlot.booked) return alert("This slot is already booked. Choose another.");

    // Simulate booking: add slot to bookedSlots
    setBookedSlots(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), selectedSlot.time]
    }));

    setBookingConfirmed(true);
  };

  if (!docInfo) return <p>Loading doctor info...</p>;

  // Related doctors
  const relatedDoctors = doctors.filter(
    doc => doc.speciality === docInfo.speciality && doc._id !== docInfo._id
  );

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Doctor Image */}
      <div className="sm:w-1/3">
        <img className="w-full rounded-lg shadow-md" src={docInfo.image} alt={docInfo.name} />
      </div>

      {/* Doctor Info */}
      <div className="sm:flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
        <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
          {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <span className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</span>
        </div>
        <div className="mt-4">
          <p className="flex items-center gap-1 font-medium text-gray-900">
            About <img src={assets.info_icon} alt="Info" />
          </p>
          <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
        </div>
        <p className="text-gray-700 font-medium mt-4">
          Appointment Fee: <span className="font-semibold">{currencySymbol}{docInfo.fees}</span>
        </p>

        {/* Day Tabs */}
        <div className="mt-6">
          <p className="text-gray-900 font-medium mb-2">Select Day:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(docSlots).map(dayLabel => (
              <button
                key={dayLabel}
                onClick={() => { setSelectedDay(dayLabel); setSelectedSlot(null); setBookingConfirmed(false); }}
                className={`px-3 py-1 rounded-full border transition-colors duration-200
                  ${selectedDay === dayLabel ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
              >
                {dayLabel}
              </button>
            ))}
          </div>

          {/* Slots */}
          {selectedDay && (
            <>
              <p className="text-gray-900 font-medium mb-2">Available Slots:</p>
              <div className="flex flex-wrap gap-2">
                {docSlots[selectedDay].map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => !slot.booked && setSelectedSlot(slot)}
                    disabled={slot.booked}
                    className={`px-3 py-1 rounded-full border transition-colors duration-200
                      ${slot.booked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : selectedSlot?.time === slot.time ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                  >
                    {slot.time}{slot.booked ? ' (Booked)' : ''}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Payment Selection */}
          {selectedSlot && !selectedSlot.booked && (
            <div className="mt-4">
              <p className="text-gray-900 font-medium mb-2">Select Payment Method:</p>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setPaymentMethod('Cash')}
                  className={`px-4 py-2 rounded-full border ${paymentMethod === 'Cash' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                >
                  Cash
                </button>
                <button
                  onClick={() => setPaymentMethod('Medical Aid')}
                  className={`px-4 py-2 rounded-full border ${paymentMethod === 'Medical Aid' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 hover:bg-green-100'}`}
                >
                  Medical Aid
                </button>
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={handleBooking}
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
              >
                Book Appointment
              </button>
            </div>
          )}

          {/* Confirmation */}
          {bookingConfirmed && selectedSlot && (
            <p className="mt-4 text-green-700 font-medium">
              Appointment booked with <span className="font-semibold">{docInfo.name}</span> on <span className="font-semibold">{selectedDay}</span> at <span className="font-semibold">{selectedSlot.time}</span> via <span className="font-semibold">{paymentMethod}</span>.
            </p>
          )}
        </div>

        {/* Related Doctors */}
        {relatedDoctors.length > 0 && (
          <div className="mt-8">
            <p className="text-gray-900 font-medium mb-2">Related Doctors:</p>
            <div className="flex flex-wrap gap-4">
              {relatedDoctors.map((doc, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${doc._id}`)}
                  className="border border-blue-200 rounded-lg p-2 cursor-pointer hover:translate-y-[-5px] transition-all duration-300"
                >
                  <img className="w-24 h-24 object-cover rounded-full mb-2" src={doc.image} alt={doc.name} />
                  <p className="text-gray-900 text-sm font-medium">{doc.name}</p>
                  <p className="text-gray-600 text-xs">{doc.speciality}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Appointment;
