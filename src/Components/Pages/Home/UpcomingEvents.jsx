import React from 'react';

const events = [
    {
      time: '10:35 am to 1:00 pm',
      date: '25 June, 2025',
      title: 'Micro Biological Workshop',
      location: 'Central Hall, New York',
    },
    {
      time: '10:35 am to 1:00 pm',
      date: '25 July, 2025',
      title: 'Web Development Workshop',
      location: 'Central Hall, New York',
    },
    {
      time: '10:35 am to 1:00 pm',
      date: '25 April, 2025',
      title: 'App Development Workshop',
      location: 'Central Hall, New York',
    },
    {
      time: '10:35 am to 1:00 pm',
      date: '25 May, 2025',
      title: 'Ios Development Workshop',
      location: 'Central Hall, New York',
    },
  ];
const UpcomingEvents = () => {
    return (
        <div className="bg-white">
        <h2 className="capitalize text-center my-5 font-bold text-xl md:text-4xl">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {events.map((event, index) => (
            <div key={index} className="p-4 text-center shadow-md hover:shadow-lg transition-all">
              <div>
                <p className="text-sm text-gray-500">{event.time}</p>
                <h3 className="text-lg font-bold text-green-600">{event.date}</h3>
                <p className="text-blue-900 font-semibold">{event.title}</p>
                <p className="text-gray-700">Place: {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default UpcomingEvents;