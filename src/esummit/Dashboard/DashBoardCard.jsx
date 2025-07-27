import React from 'react';

const DashBoardCard = ({ title, date }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center h-[400px] w-[369px]">
      {/* Circular avatar placeholder */}
      <div className="w-48 h-48 bg-black rounded-full mb-4"></div>

      {/* Event details */}
      <div className="text-center">
        <h3 className="text-gray-900 font-serif text-2xl mb-2">{title}</h3>
        <p className="text-gray-700 text-m">{date}</p>
      </div>
    </div>
  );
};

export default DashBoardCard;
