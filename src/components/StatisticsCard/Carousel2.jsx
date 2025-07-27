import React from 'react';

const Carousel2 = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black mt-8 py-4 md:py-6">
      {/* Inline keyframes for animation */}
      <style>{`
        @keyframes scroll-left-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% + 100vw));
          }
        }
        .animate-scroll-x {
          animation: scroll-left-right 8s linear infinite;
          display: flex;
          width: max-content;
        }
        @media (max-width: 768px) {
          @keyframes scroll-left-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% + 250vw));
            }
          }
        }
      `}</style>

      {/* Gradient sides - optimized for mobile */}
      <div className="absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="animate-scroll-x">
        <div className="flex gap-6 md:gap-12 px-4">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="text-[18px] md:text-[18px] font-normal leading-[100%] tracking-[0.4em] font-poppins text-white whitespace-nowrap">
                KIIT
              </div>
              <div className="text-[18px] md:text-[18px] font-normal leading-[100%] tracking-[0.4em] font-poppins text-blue-500 whitespace-nowrap">
                E-Cell
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel2;