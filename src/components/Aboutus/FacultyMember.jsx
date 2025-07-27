import React, { useState } from "react";
import { Skeleton } from '@mui/material';

const advisoryMembers = [
  {
    name: "Prof. Saranjit Singh",
    role: "Chief Advisor",
    image: "https://ik.imagekit.io/d73k0qzwc/Prof.-Saranjit-Singh.jpg",
  },
  {
    name: "Prof. Suman Bhattacharya",
    role: "Faculty Incharge – E-Cell",
    image: "https://ik.imagekit.io/d73k0qzwc/WhatsApp%20Image%202025-07-14%20at%2001.24.32_f167ad28.jpg",
  },
  {
    name: "Prof. Jnyana Ranjan Mohanty",
    role: "Advisor",
    image: "https://ik.imagekit.io/d73k0qzwc/WhatsApp%20Image%202025-07-14%20at%2002.35.46_eec83bac.jpg",
  },
  {
    name: "Prof. Kumar Mohanty",
    role: "Advisor",
    image: "https://ik.imagekit.io/d73k0qzwc/WhatsApp%20Image%202025-07-14%20at%2002.35.46_6e638ebe.jpg",
  },
  {
    name: "Prof. Sudhir Charan Satapathy",
    role: "Advisor",
    image: "https://ik.imagekit.io/d73k0qzwc/Mr.-Sudhir-Charan-Satapathy.jpg",
  },
];

const AdvisoryCard = ({ member, size = "large" }) => {
  const [loadedImages, setLoadedImages] = useState({});
  // Adjust card/image size based on 'size' prop
  const cardSize =
    size === "large"
      ? "max-w-[120px] sm:max-w-[140px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[260px]"
      : "max-w-[100px] sm:max-w-[120px] md:max-w-[170px] lg:max-w-[200px] xl:max-w-[220px]";
  const aspect = "aspect-[2/3]";
  return (
    <div
      className={`bg-white shadow-lg hover:shadow-xl border border-white flex flex-col ${aspect} w-full ${cardSize} transition-all duration-300 mx-auto`}
    >
      {/* Image Section */}
      <div className="flex-[4] bg-gray-100 relative">
        {member.image ? (
          <>
            {!loadedImages[member.image] && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                className="w-full h-full rounded-t absolute top-0 left-0"
                sx={{ borderRadius: 8, zIndex: 10, position: 'absolute', top: 0, left: 0 }}
                animation="pulse"
              />
            )}
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full object-cover rounded-t transition-opacity duration-300 ${loadedImages[member.image] ? 'opacity-100' : 'opacity-0'}`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              onLoad={() => setLoadedImages(prev => ({ ...prev, [member.image]: true }))}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <span className="text-sm">Photo</span>
            </div>
          </div>
        )}
      </div>
      {/* Info Section */}
      <div className="bg-black/90 px-2 py-1 text-center h-12 sm:h-14 md:h-20 flex flex-col justify-center min-w-0 w-full md:overflow-visible">
        <h3 className="text-white font-semibold text-[11px] sm:text-sm md:text-base lg:text-sm leading-tight whitespace-normal break-words hyphens-auto md:max-h-none md:overflow-visible">
          {member.name}
        </h3>
        <p className="text-gray-300 text-[9px] sm:text-xs md:text-sm lg:text-xs leading-tight whitespace-normal break-words hyphens-auto md:max-h-none md:overflow-visible">{member.role}</p>
      </div>
    </div>
  );
};

const AdvisoryTeam = () => {
  return (
    <section className="py-6 px-2 sm:px-4 md:px-6 bg-black relative overflow-hidden">
      {/* White grid background with horizontal and vertical lines, grid fades out toward bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 w-full h-full"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 75%, transparent 100%)',
        }}
      >
        {/* Vertical lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 border-l border-white/20"
            style={{ left: `${(i / 12) * 100}%`, opacity: 0.5 }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 border-t border-white/20"
            style={{ top: `${(i / 8) * 100}%`, opacity: 0.5 }}
          />
        ))}
        {/* Small white diamond (kite) shapes at a few grid intersections */}
        {/* Example positions: (col, row) pairs: (2,2), (5,4), (9,3), (7,7), (11,6), (4,6), (8,1), (10,5), (3,5) */}
        {[
          { col: 2, row: 2 },
          { col: 5, row: 4 },
          { col: 9, row: 3 },
          { col: 7, row: 7 },
          { col: 11, row: 6 },
          { col: 4, row: 6 },
          { col: 8, row: 1 },
          { col: 10, row: 5 },
          { col: 3, row: 5 },
          { col: 1, row: 5 },
          { col: 1, row: 1 },
          { col: 11, row: 2 },
          { col: 10, row: 0 },
        ].map(({ col, row }, idx) => (
          <div
            key={`diamond-${idx}`}
            className="absolute bg-white opacity-80 rotate-45"
            style={{
              left: `calc(${(col / 12) * 100}% - 0.375rem)`,
              top: `calc(${(row / 8) * 100}% - 0.375rem)`,
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              zIndex: 20,
            }}
          />
        ))}
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wide">
            <span className="text-white block">OUR</span>
            <span className="text-sky-400 block mt-1 text-3xl md:text-5xl">
              ADVISORY TEAM
            </span>
          </h2>
        </div>
        {/* Responsive Grid: 2 on top, 3 below, all fit on one screen */}
        <div className="flex flex-col gap-4 items-center w-full">
          {/* Row 1: 2 cards, centered above 3 with large gap only on desktop */}
          <div className="flex justify-center gap-0 md:gap-32 w-full">
            {advisoryMembers.slice(0, 2).map((member, index) => (
              <div key={index} className="flex-1 flex justify-center max-w-[180px]">
                <AdvisoryCard member={member} size="" />
              </div>
            ))}
          </div>
          {/* Row 2: 3 cards, centered below with large gap only on desktop */}
          <div className="flex justify-center gap-8 md:gap-32 w-full mt-4">
            {advisoryMembers.slice(2).map((member, index) => (
              <div key={index + 2} className="flex-1 flex justify-center max-w-[180px]">
                <AdvisoryCard member={member} size="large" />
              </div>
            ))}
          </div>
        </div>
        {/* Make sure the whole section is never taller than 90vh on any device */}
      </div>
    </section>
  );
};

export default AdvisoryTeam;
