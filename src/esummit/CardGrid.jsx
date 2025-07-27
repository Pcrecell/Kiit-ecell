import React from 'react';
import Events from './Events'; // assumes this is your JavaScript version of Events

const CardGrid = () => {
  const events = [
    {
      id: 1,
      name: 'Event Name',
      description:
        'An opportunity for aspiring entrepreneurs to put their sharpest abilities to the test and compete with the best to foster their entrepreneurial spirit'
    },
    {
      id: 2,
      name: 'Event Name',
      description:
        'An opportunity for aspiring entrepreneurs to put their sharpest abilities to the test and compete with the best to foster their entrepreneurial spirit'
    },
    {
      id: 3,
      name: 'Event Name',
      description:
        'An opportunity for aspiring entrepreneurs to put their sharpest abilities to the test and compete with the best to foster their entrepreneurial spirit'
    },
    {
      id: 4,
      name: 'Event Name',
      description:
        'An opportunity for aspiring entrepreneurs to put their sharpest abilities to the test and compete with the best to foster their entrepreneurial spirit'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto p-4 bg-black">
      {events.map((event) => (
        <Events
          key={event.id}
          name={event.name}
          description={event.description}
        />
      ))}
    </div>
  );
};

export default CardGrid;
