import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const managingBodyMembers = [
  {
    id: 1,
    name: "Sarvagya Singh",
    designation: "Chairman",
    imageUrl: "https://ik.imagekit.io/ilgcom35w/sarvagya-bhaiya.jpg?updatedAt=1753971538969",
  },
  {
    id: 2,
    name: "Aman Kumar",
    designation: "Managing Director",
    imageUrl: "https://ik.imagekit.io/fhervghik/E-Cell%20Website/upscalemedia-transformed.jpeg",
  },
  {
    id: 3,
    name: "Ayush Nayak",
    designation: "Human Resource Manager",
    imageUrl: "https://ik.imagekit.io/ilgcom35w/ayush-nayak-bhaiya.jpg?updatedAt=1753974111852",
  },
  {
    id: 4,
    name: "Shivli Singh",
    designation: "Chief Operating Officer",
    imageUrl: "https://ik.imagekit.io/d73k0qzwc/1739569286157.jpg",
  },
  {
    id: 5,
    name: "Shubh Mittal",
    designation: "Chief Technology Officer",
    imageUrl: "https://ik.imagekit.io/d73k0qzwc/shubh.jpg",
  },
  {
    id: 6,
    name: "Aaryak Prasad",
    designation: "Director - T&P Associate",
    imageUrl: "https://ik.imagekit.io/d73k0qzwc/aaryak.jpg",
  },
  {
    id: 7,
    name: "Rayan Alam",
    designation: "Executive Director Advisory",
    imageUrl: "https://ik.imagekit.io/d73k0qzwc/rayan.jpg",
  },
  {
    id: 8,
    name: "Tushar",
    designation: "Executive Director Outreach",
    imageUrl: "https://ik.imagekit.io/d73k0qzwc/tushar.jpg",
  },
];

const ManagingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const intervalRef = useRef(null);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numSlides);
    }, 5000);
  };

  useEffect(() => {

    
  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(2);
    }
  };

  updateItemsPerPage(); // initial check
  window.addEventListener("resize", updateItemsPerPage);

  return () => window.removeEventListener("resize", updateItemsPerPage);
}, []);

  const numSlides = Math.ceil(managingBodyMembers.length / itemsPerPage);

  // Auto-carousel functionality - always enabled
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numSlides);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(intervalRef.current);
  }, [numSlides]);

  const nextGroup = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numSlides);
    resetInterval();
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numSlides) % numSlides);
    resetInterval();
  };

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = managingBodyMembers.slice(startIndex, endIndex);

  const [loadedImages, setLoadedImages] = useState({});
  const cardBaseClasses = "flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 border-2 border-white overflow-visible flex flex-col shadow-xl transition-all duration-500 ease-in-out";
  const placeholderWidthClasses = "flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64";

  return (
    <div className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
      <div className="relative">
        <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center overflow-visible relative">
          {currentMembers.map((member, index) => (
            <div key={member.id} className={`${cardBaseClasses} relative`}>
              <div className="aspect-square flex items-center justify-center overflow-hidden relative">
                {!loadedImages[member.imageUrl] && (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    className="w-full h-full absolute top-0 left-0 rounded"
                    sx={{ borderRadius: 8, zIndex: 10, position: 'absolute', top: 0, left: 0 }}
                    animation="pulse"
                  />
                )}
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[member.imageUrl] ? 'opacity-100' : 'opacity-0'}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [member.imageUrl]: true }))}
                />
              </div>
              <div className="min-h-[80px] sm:min-h-[90px] md:min-h-[100px] bg-gray-300 p-3 sm:p-4 text-center flex flex-col justify-center">
                <p className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate">{member.name}</p>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base truncate mt-1">{member.designation}</p>
              </div>

              {/* Previous Button */}
              {index === 0 && managingBodyMembers.length > itemsPerPage && (
                <button
                  onClick={prevGroup}
                  className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-50 p-2 sm:p-2.5 md:p-3 bg-white/80 text-black rounded-full shadow-xl hover:bg-white/90 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:scale-110"
                  aria-label="Previous group"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
              )}

              {/* Next Button */}
              {index === currentMembers.length - 1 && managingBodyMembers.length > itemsPerPage && (
                <button
                  onClick={nextGroup}
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-50 p-2 sm:p-2.5 md:p-3 bg-white/80 text-black rounded-full shadow-xl hover:bg-white/90 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:scale-110"
                  aria-label="Next group"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
              )}
            </div>
          ))}

          {/* Placeholder for layout consistency */}
          {currentMembers.length === 1 && itemsPerPage === 2 && (
            <div className={`${placeholderWidthClasses} opacity-0`} aria-hidden="true">
              <div className="aspect-square"></div>
              <div className="min-h-[80px] sm:min-h-[90px] md:min-h-[100px] bg-gray-300"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagingCarousel;
