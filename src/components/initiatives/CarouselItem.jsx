import React from 'react';
import PropTypes from 'prop-types';

const CarouselItem = ({ item, positionX, positionY, isActive, zIndex }) => {
  const size = isActive ? 'w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32' : 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24';
  const opacity = isActive ? 'opacity-100' : 'opacity-60';
  const scale = isActive ? 'scale-100' : 'scale-90';
  
  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${size} ${opacity} ${scale}`}
      style={{
        transform: `translate(${positionX}px, ${positionY}px) translate(-50%, -50%) ${isActive ? 'scale(1)' : 'scale(0.9)'}`,
        zIndex: zIndex,
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 cursor-pointer hover:shadow-xl transition-shadow">
        <div className="p-2 text-center">
          <h3 className="font-semibold text-xs md:text-sm truncate">{item.title}</h3>
          <p className="text-xs opacity-80 mt-0.5 line-clamp-2">{item.text}</p>
        </div>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    centerText: PropTypes.string.isRequired,
  }).isRequired,
  positionX: PropTypes.number.isRequired,
  positionY: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
};

export default CarouselItem;