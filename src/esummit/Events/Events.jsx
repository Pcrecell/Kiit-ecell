import React, { useState } from "react";
import EventPopup from "./EventPopup";

// Sample data for events
const events = [
  {
    id: 1,
    name: "Demo Day",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 2,
    name: "Oracle",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 3,
    name: "Expo",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 4,
    name: "Case Battle",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 5,
    name: "Alice in Founderland",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 6,
    name: "Pandora's Paradox",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
  {
    id: 7,
    name: "Hackathon",
    image: "/images/test.jpg",
    date: "2023-10-01",
    description:
      "Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conferenceJoin industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...Join industry leaders in this year's top tech conference...",
  },
];

const EventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [fogPos, setFogPos] = useState({ x: 0, y: 0 });
  const [hoveringCard, setHoveringCard] = useState(null);

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFogPos({
      x: e.clientX - rect.left,
      y: rect.height / 2, // locked vertical center of the card
    });
    setHoveringCard(id);
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen bg-black text-white p-10 items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/mythical-green-bg.jpg')" }}
    >
      {/* LEFT FOG */}
    <div className="pointer-events-none absolute rounded-br-3xl rounded-t-3xl top-2rem left-0 h-[95%] w-32 bg-green-500 opacity-10 blur-3xl animate-drift-slow z-0" />

    {/* RIGHT FOG */}
    <div className="pointer-events-none absolute rounded-bl-3xl rounded-t-3xl top-2rem right-0 h-[95%] w-32 bg-green-500 opacity-10 blur-3xl animate-drift-slow z-0" />

      
      {/* Main screen */}
      <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl xl:ml-20 font-bold mb-12 ml-0 md:ml-10 text-center md:text-left font-poppins-bold my-8">
        Events
      </h1>

      <div className="flex flex-col items-center space-y-10 mb-20">
        {events.map((event) => (
          <div
            key={event.id}
            onMouseMove={(e) => handleMouseMove(e, event.id)}
            onMouseLeave={() => setHoveringCard(null)}
            className="relative group flex flex-col shadow-md md:flex-row items-center bg-transparent bg-opacity-40 border border-green-900 rounded-xl overflow-hidden shadow-lg w-[95%] max-w-6xl transition duration-300 p-4 md:p-6"
          >
            {/* FOG EFFECT */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300"
              style={{
                opacity: hoveringCard === event.id ? 1 : 0,
              }}
            >
              <div
                className="w-72 h-72 rounded-full bg-green-400 opacity-20 blur-3xl absolute transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${fogPos.x - 144}px, ${
                    fogPos.y - 144
                  }px)`,
                }}
              ></div>
            </div>

            {/* Card Image with 4:5 Aspect Ratio */}
            <div className="w-full md:w-28 aspect-[4/5] rounded-md overflow-hidden mb-4 md:mb-0">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 px-0 md:px-10 text-center md:text-left flex flex-col justify-center">
              <h2 className="text-2xl font-poppins-bold mb-2">{event.name}</h2>
              <p className="text-sm text-gray-300 mb-3">{event.date}</p>
              <p className="mb-4 text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3">
                {event.description}
              </p>
            </div>

            <button
              className="bg-white font-poppins-bold hover:bg-green-500 text-black font-bold py-2 px-6 rounded-full shadow-md transition duration-200 mt-2 md:mt-0 md:ml-4 w-full md:w-48 h-15 mx-auto md:mx-4"
              onClick={() => setSelectedEvent(event)}
            >
              Show more
            </button>
          </div>
        ))}
      </div>

      {/* Conditionally render the popup when an event is selected */}
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default EventPage;
