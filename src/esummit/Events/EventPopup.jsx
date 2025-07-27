import React, { useEffect, useRef, useState } from "react";

const EventPopup = ({ event, onClose }) => {
  const popupRef = useRef(null);
  const [animateOut, setAnimateOut] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-xl flex justify-center items-center z-50 px-4"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        ref={popupRef}
        className={`bg-gradient-to-br from-black to-grey text-white rounded-xl p-6 w-full max-w-md md:max-w-xl lg:max-w-5xl shadow-2xl relative overflow-y-auto max-h-[90vh] flex flex-col md:flex-row gap-6 items-center md:items-start border-2 border-green-600 ${
          animateOut ? "animate-popupOut" : "animate-popupIn"
        }`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-1 text-green-300 hover:text-white font-bold text-xl transition"
          onClick={handleClose}
        >
          ×
        </button>

        {/* Image on the left */}
        <div className="flex flex-col md:w-1/2 flex-shrink-0 items-center md:items-start">
          <div className="w-[90%] aspect-[4/5] md:m-1 md:ml-5">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover rounded-md border border-green-700"
            />
          </div>
          <div className="flex flex-col items-center mt-4 space-y-3 w-full">
            <p className="text-2xl text-gray-300">{event.date}</p>
            {/* Register button */}
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-md transition duration-300"
              onClick={() => alert("Register clicked!")}
            >
              Register
            </button>
          </div>
        </div>

        {/* Title & description on the right */}
        <div className="flex flex-col justify-center md:w-1/2 px-2 md:px-6 md:pl-8">
          <h2 className="text-white text-2xl md:text-4xl font-semibold mb-4 text-center md:text-left leading-tight">
            {event.name}
          </h2>
          <p className="text-green-100 text-center md:text-left leading-relaxed text-sm md:text-base">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
