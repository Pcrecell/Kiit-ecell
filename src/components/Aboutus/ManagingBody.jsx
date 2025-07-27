import React from 'react';
import ManagingCarousel from './ManagingCarousel';
import KiteBackground from './KiteBackground';

const ManagingBody = () => {
  return (
    <KiteBackground>   
      <div className="relative w-full min-h-[auto] bg-none py-10 sm:py-12 md:py-16 lg:pt-10 lg:pb-20 flex flex-col lg:flex-row items-start lg:justify-between px-6 sm:px-8 md:px-10 lg:px-[8vh]">
        <div className="absolute left-3 sm:left-[5vh] md:left-[6vh] lg:left-[8vh] top-0 w-1 sm:w-[0.7vw] md:w-[0.6vw] h-full bg-white z-0 block"></div>

        <div className="relative flex flex-col items-start font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mix-blend-screen space-y-1 sm:space-y-1.5 md:space-y-2 mb-10 sm:mb-12 md:mb-16 lg:mb-0 lg:w-2/5 ml-4 sm:ml-[2vh] md:ml-[3vh] lg:ml-[7vh] mt-6 sm:mt-8 md:mt-12 lg:mt-0 max-w-full">
          <p className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-7xl bg-white pt-2 sm:pt-3 px-2 pb-1 break-words max-w-full">
            OUR
          </p>
          <p className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl bg-gradient-to-r from-[#00B7FF] to-[#00577A] pt-1 sm:pt-2 px-2 pb-1 sm:pb-2 break-words max-w-full">
            MANAGING
          </p>
          <p className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl bg-white pt-1 sm:pt-2 px-2 pb-2 sm:pb-3 break-words max-w-full">
            BODY
          </p>
        </div>

        <div className="relative w-full lg:w-3/5 flex justify-center lg:justify-end items-center mt-6 sm:mt-8 md:mt-12 lg:mt-10 lg:mb-7 px-4 sm:px-2 md:px-0">
          <ManagingCarousel />
        </div>
      </div>
    </KiteBackground>
  );
};

export default ManagingBody;
