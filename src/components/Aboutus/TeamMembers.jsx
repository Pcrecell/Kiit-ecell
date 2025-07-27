import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@mui/material";
import faculty1 from "../../assets/Images/png/faculty-1.png";
import faculty2 from "../../assets/Images/png/faculty-2.png";
import faculty3 from "../../assets/Images/png/faculty-3.png";
import faculty4 from "../../assets/Images/png/faculty-4.png";

const TeamMembers = ({
  activeTeamCategory,
  teamMembers,
  globalLoadedImages,
  onGlobalImageLoad,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const itemsPerPage = 4;
  const currentMembers = teamMembers[activeTeamCategory] || [];
  const totalPages = Math.ceil(currentMembers.length / itemsPerPage);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const threshold = 50; // Minimum distance to trigger swipe

    if (distance > threshold) {
      nextPage(); // swipe left
    } else if (distance < -threshold) {
      prevPage(); // swipe right
    }

    // reset
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Reset page when category changes but DON'T reset loaded images
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTeamCategory]);

  const handleImageLoad = (key) => {
    onGlobalImageLoad(key);
    setImageErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleImageError = (key) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
    onGlobalImageLoad(key); // Consider error as "loaded" to hide skeleton
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Array of placeholder images to randomly assign
  const placeholderImages = [faculty1, faculty2, faculty3, faculty4];

  // Function to get a random placeholder image for each member
  const getRandomPlaceholder = (memberName, index) => {
    const hash = memberName.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return placeholderImages[Math.abs(hash + index) % placeholderImages.length];
  };

  // Get current page items
  const startIndex = currentPage * itemsPerPage;
  const currentPageMembers = currentMembers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-[#2B2B2B] py-6">
      <div className="py-8 px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-5xl text-white font-poppins bg-gradient-to-r from-[#2B2B2B] to-[#878787] inline-block py-2 px-2">
            TEAM MEMBERS
          </h2>
        </div>{" "}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={prevPage}
            disabled={totalPages <= 1}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white/80 text-black rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex items-center justify-center"
          >
            <ChevronLeft size={24} className="md:w-6 md:h-6" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Team Members Grid - Always show 4 items in a row */}
            <div className="overflow-hidden">
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{ transform: `translateX(-${currentPage * 100}%)` }}
  >
    {Array.from({ length: totalPages }).map((_, pageIndex) => {
      const start = pageIndex * itemsPerPage;
      const membersForPage = currentMembers.slice(start, start + itemsPerPage);

      return (
        <div
          key={pageIndex}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full flex-shrink-0"
        >
          {membersForPage.map((member, index) => {
            const globalIndex = start + index;
            const imageKey = `${activeTeamCategory}-${globalIndex}`;
            const placeholderImage = getRandomPlaceholder(
              member.name,
              globalIndex
            );

            return (
              <div
                key={globalIndex}
                className="border border-[#FFFFFFF]/50 p-2 sm:p-3 md:p-4 flex flex-col hover:bg-[#0c5070]/30 transition-colors cursor-pointer relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <div className="relative flex-1 mb-2">
                  {!globalLoadedImages[imageKey] && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      animation="pulse"
                    />
                  )}
                  <img
                    src={placeholderImage}
                    alt={member.name}
                    className={`w-full h-full object-cover rounded transition-opacity duration-300 ${
                      globalLoadedImages[imageKey]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(imageKey)}
                    onError={() => handleImageError(imageKey)}
                    loading="eager"
                  />
                </div>
                <div className="bg-white/90 px-2 sm:px-3 py-1.5 sm:py-2 self-stretch">
                  <p className="text-[#092B3B] font-medium text-xs sm:text-sm truncate">
                    {member.name}
                  </p>
                  <p className="text-[#092B3B]/70 text-[10px] sm:text-xs uppercase truncate">
                    {member.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
</div>

          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPage}
            disabled={totalPages <= 1}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white/80 text-black rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex items-center justify-center"
          >
            <ChevronRight size={24} className="md:w-6 md:h-6" />
          </button>

          {/* Page Indicators */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentPage === index
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
