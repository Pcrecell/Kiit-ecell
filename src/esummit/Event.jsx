import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Dummy event data
const events = [
   {
    title: "ORACLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs jhdsbfgshdvf hgsdvfhsgdfvsndbvnbs.",
    image: "https://i.postimg.cc/phG1M6WM/oracle-1.png",
    image1: "https://i.postimg.cc/zbLGCzxs/oracle-ticket-01.png",
  },
  {
    title: "ALICE IN FOUNDERLAND",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs jfrjkerfjkesrdfbjesrfb nbdfjebfjebjferjhrfbehjrbjh .",
    image: "https://i.postimg.cc/0rjB0Pnk/Alice-in-founderland-1.png",
    image1: "https://i.postimg.cc/w1HMCdBN/aif-ticket-01.png",
  },
  {
    title: "CASE BATTLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs sdbfjshdjfbjsdnbfmndb fmnmnsdbfnbfnsbfb.",
  },
  {
    title: "PANDORAS PARADOX",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs dcfbhjdfjhdfdhfd vhfhdvfjdhvsdnbf nsdbfndbfbdnd.",
    image: "https://i.postimg.cc/zHy2zFvb/pandoras-paradox-1.png",
    image1: "https://i.postimg.cc/f3qbStf7/pandoras-paradox-ticket-01.png",
  },
  {
    title: "EXPO",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs sdvfghsdvfg sbdvfnsbdvfn nbdvnbsdvnbsvc.",
  },
  {
    title: "ORACLE",
    date: "AUG 15",
    desc: "An opportunity for aspiring entrepreneurs jhdsbfgshdvf hgsdvfhsgdfvsndbvnbs.",
    image: "https://i.postimg.cc/phG1M6WM/oracle-1.png",
    image1: "https://i.postimg.cc/zbLGCzxs/oracle-ticket-01.png",
  },
];

const EventCard = ({ title, date, desc, image, image1, isHovered, centered,venue,time }) => {
  // Detect if device is mobile
  const isMobile = window.innerWidth < 768;

  return (
  <motion.div
  layout
  animate={{
   width:
  isHovered
    ? isMobile
      ? "100%"
      : 600
    : "100%",
maxWidth: isMobile ? "100%" : "none",// No overflow outside parent

     scale: isMobile && !isHovered ? 0.96 : 1,
    x: isMobile && isHovered && centered ? "-50%" : 0,
    left: isMobile && isHovered && centered ? "50%" : "auto",
   position: "relative",
    zIndex: isMobile && isHovered ? 10 : 1,
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="relative h-[250px] md:h-[280px] bg-black rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between w-full sm:w-[48%] md:w-[260px]"
>

  <AnimatePresence mode="wait" initial={false}>
  {isHovered ? (
    <motion.div
      key="hovered"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
       transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
      layout
      className="flex h-full w-full"
    >
      {/* Left Image */}
      <motion.div layout className="w-[40%] h-full relative">
        <img
          src={image1 || "https://via.placeholder.com/200x300"}
          alt="Event"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Content */}
      <motion.div layout className="w-[60%] h-full bg-[#1C1A1A] p-6 flex flex-col justify-center">
        <motion.div layout className="flex flex-col justify-start h-full">
         <motion.h3
  layout
  className="text-xl font-semibold mb-2 text-center"
  style={{ color: '#00FF3A' }}
>

            {title}
          </motion.h3>
          <motion.p layout className="text-white text-sm text-center mb-4">{desc}</motion.p>

          {/* Date, Venue, Time Boxes */}
          <motion.div layout className="flex gap-x-4 justify-start">
            {/* Box 1 */}
            <motion.div layout className="w-20 h-16 bg-[#00FF3A] rounded-3xl overflow-hidden">
              <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-sm font-bold font-poppins">
                DATE
              </div>
              <div className="h-[2px] bg-white w-full" />
              <div className="h-full flex justify-center font-montserrat text-[#292929] text-md font-bold bg-gradient-to-b from-[#2EB24C] to-[white]">
                {date}
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div layout className="w-28 h-16 bg-[#00FF3A] rounded-3xl overflow-hidden">
              <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-sm font-bold font-poppins">
                VENUE
              </div>
              <div className="h-[2px] bg-white w-full" />
              <div className="h-full flex items-center justify-center font-montserrat text-[#292929] text-xs font-medium bg-gradient-to-b from-[#2EB24C] to-[white]">
                {venue}
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div layout className="w-20 h-16 bg-[#00FF3A] rounded-3xl overflow-hidden">
              <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-sm font-bold font-poppins">
                TIME
              </div>
              <div className="h-[2px] bg-white w-full" />
              <div className="h-full flex items-center justify-center text-sm font-montserrat text-[#292929] font-bold bg-gradient-to-b from-[#2EB24C] to-[white]">
                {time}
              </div>
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <motion.div layout className="flex justify-center gap-4 mt-8">
            <button className="inline-flex px-4 py-2 bg-[#2EB24C] text-black rounded-3xl text-sm font-semibold font-syne hover:scale-105 transition">
              Register
               <ArrowUpRight size={20} />
            </button>
            <button className="inline-flex px-4 py-2 bg-[#2EB24C] text-black rounded-3xl text-sm font-semibold font-syne hover:scale-105 transition">
              Learn More
               <ArrowUpRight size={20} />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : (
    <>
      {!isHovered && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
           transition={{ duration: 0, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            
          </motion.div>
        )}
        
      {/* Top Image */}
<motion.div
  layout
  className="w-full h-[70%] md:h-[70%] bg-black rounded-t-2xl overflow-hidden"
>
  <img
    src={image || "https://via.placeholder.com/260x170"}
    alt="Event"
    className="w-full h-full object-top"
  />
</motion.div>

{/* Ticket Section */}
<motion.div
  layout
  className="relative w-full h-[30%] md:h-[30%] overflow-hidden rounded-b-2xl -mt-[1px]" // slight negative margin to close gap
>
  <img
    src="https://i.postimg.cc/66mVR2gN/Group-10-1.png"
    alt="Ticket Background"
    className="absolute inset-0 w-full h-full object-cover z-0 shadow-[0_0_40px_#00FF00]"
  />

  <motion.div layout className="relative z-10 flex h-full w-full px-3 gap-3">
    <div className="flex flex-col py-2 items-center leading-tight">
      <span className="text-[10px] font-bold text-white">AUG</span>
      <span className="text-[20px] font-bold text-white">15</span>
    </div>
    <div className="flex flex-col text-sm leading-tight">
      <h3 className="font-bold text-base text-[#00FF3A] pt-2">{title}</h3>
      <p className="text-[11px] text-white hidden sm:block">{desc}</p>
    </div>
  </motion.div>
</motion.div>

    </>
  )}
  </AnimatePresence>
</motion.div>


  );
};

export const Event = ({date,venue,time}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-black text-white py-16 px-4">
     <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[78.48px] leading-[0.85] tracking-tight text-center mb-16">
  Events
</h2>

<LayoutGroup>
     <div className="hidden md:grid grid-cols-6 gap-x-12 gap-y-8 max-w-7xl mx-auto px-4">
{/* First Card */}
<motion.div
layout
  className="col-start-2 col-span-2"
  animate={{
    width:
      hoveredIndex === 0
        ? 320
        : hoveredIndex === 1
        ? 280
        : 280,
    x:
      hoveredIndex === 0
        ? -260 // shift to the left when hovered
        : hoveredIndex === 1
        ? 0 // optionally shift if second is hovered
        : 0,
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  onMouseEnter={() => setHoveredIndex(0)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  <EventCard {...events[0]} isHovered={hoveredIndex === 0} />
</motion.div>


{/* Second Card */}
<motion.div
layout
  className="col-start-4 col-span-2"
  animate={{
    width:
      hoveredIndex === 1
        ? 320
        : hoveredIndex === 0
        ? 280
        : 280,
    x:
      hoveredIndex === 1
        ? -60 // shift left when hovered
        : hoveredIndex === 0
        ? 0 // shift right when first card is hovered
        : 0,
  }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
  onMouseEnter={() => setHoveredIndex(1)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  <EventCard {...events[1]} isHovered={hoveredIndex === 1} />
</motion.div>
       {/* Bottom row */}
<motion.div
layout
  className="col-start-1 col-span-2 row-start-2"
  animate={{
    width: hoveredIndex === 4 ? 220 : hoveredIndex === 3 ? 220 : hoveredIndex === 2 ? 320 : 280,
    x: hoveredIndex === 4 ? -40 : hoveredIndex === 3 ? -40 : 0,
  }}
  transition={{ type: "spring", stiffness: 120, damping: 30 }}
  onMouseEnter={() => setHoveredIndex(2)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  <EventCard {...events[2]} isHovered={hoveredIndex === 2} />
</motion.div>

<motion.div
  layout
  className="col-start-3 col-span-2 row-start-2 flex justify-center"
  animate={{
    width: hoveredIndex === 3 ? 320 : hoveredIndex === 2 ? 220 : hoveredIndex === 4 ? 220 : 280,
    x:
      hoveredIndex === 2
        ? 280 // shift right when left card is hovered
        : hoveredIndex === 4
        ? -160 // shift left when right card is hovered
        : hoveredIndex === 3
        ? -100
        : 0,
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  onMouseEnter={() => setHoveredIndex(3)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  <div className="w-full max-w-[320px]">
    <EventCard
      {...events[3]}
      isHovered={hoveredIndex === 3}
      centered={true}
    />
  </div>
</motion.div>
<motion.div
layout
  className="col-start-5 col-span-2 row-start-2"
  animate={{
    width:
      hoveredIndex === 4
        ? 320
        : hoveredIndex === 2 || hoveredIndex === 3
        ? 220
        : 280,
    x:
      hoveredIndex === 4
        ? -260 
        : hoveredIndex === 2 || hoveredIndex === 3
        ? 180 
        : 0,
  }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
  onMouseEnter={() => setHoveredIndex(4)}
  onMouseLeave={() => setHoveredIndex(null)}
>
  <EventCard {...events[4]} isHovered={hoveredIndex === 4} />
</motion.div>


      </div>
      </LayoutGroup>
      {/* ✅ Mobile Grid Layout: 2-2-1 */}
{/* ✅ Mobile Responsive Layout: 2-2-1 default, 2-1-2 on tap */}
<div className="md:hidden w-full max-w-full overflow-x-hidden px-2">
  {(() => {
    const tappedIndex = hoveredIndex;
    const allCards = events.map((e, i) => ({ ...e, index: i }));

    const renderCard = (card, isHovered = false) => (
      <div
        key={card.index}
        onClick={() =>
          setHoveredIndex(tappedIndex === card.index ? null : card.index)
        }
      >
        <EventCard {...card} isHovered={isHovered} centered={isHovered} />
      </div>
    );

    if (tappedIndex !== null) {
      // ✅ 2-1-2 layout when tapped
      const tappedCard = allCards[tappedIndex];
      const others = allCards.filter((_, i) => i !== tappedIndex);
      const topRow = others.slice(0, 2);
      const bottomRow = others.slice(2, 4);

      return (
        <>
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-x-4 mb-8">
            {topRow.map((card) => renderCard(card, false))}
          </div>

          {/* Center Row - Expanded tapped card */}
          <motion.div
            key={tappedCard.index}
            onClick={() => setHoveredIndex(null)}
            layout
            className=" flex justify-center mb-8"
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
          <motion.div
  layout
 className="w-full sm:w-auto mx-auto flex flex-row rounded-3xl overflow-hidden bg-black sm:h-[300px] h-auto shadow-lg"

>
  {/* Left image */}
  <motion.div layout className="w-[50%] h-full relative">
    <img
      src={tappedCard.image}
      alt="event"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </motion.div>

  {/* Right content */}
 <motion.div
  layout
  className="w-[50%] bg-[#1C1A1A] text-white p-4 flex flex-col justify-between"
>
  {/* Title + Date */}
  <div className="flex justify-center items-center ">
    <div className="flex flex-col items-center gap-1 text-center">
      <p
        className="text-xl font-semibold "
        style={{ color: '#00FF3A' }}
      >
        {tappedCard.title}
      </p>
      <p className="text-[11px] text-white sm:hidden px-2">{tappedCard.desc}</p>
    </div>
  </div>
{/* Date, Time, Venue Layout */}
<motion.div
  layout
  className="flex flex-col sm:flex-row sm:items-start gap-3 mt-4 sm:mt-6 justify-center sm:justify-start"
>
  {/* Row 1: Date + Time */}
  <div className="flex gap-3 justify-center sm:justify-start">
    {/* DATE */}
    <motion.div layout className="w-20 h-12 bg-[#00FF3A] rounded-xl overflow-hidden">
      <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-[11px] font-bold font-poppins">
        DATE
      </div>
      <div className="h-[2px] bg-white w-full" />
      <div className="h-full flex items-center justify-center font-montserrat text-[#292929] text-sm font-bold bg-gradient-to-b from-[#2EB24C] to-white">
        {date}
      </div>
    </motion.div>

    {/* TIME */}
    <motion.div layout className="w-20 h-12 bg-[#00FF3A] rounded-xl overflow-hidden">
      <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-[11px] font-bold font-poppins">
        TIME
      </div>
      <div className="h-[2px] bg-white w-full" />
      <div className="h-full flex items-center justify-center text-sm font-montserrat text-[#292929] font-bold bg-gradient-to-b from-[#2EB24C] to-white">
        {time}
      </div>
    </motion.div>
  </div>

  {/* Row 2: Venue Centered in Mobile */}
  <div className="flex justify-center sm:justify-start w-full">
    <motion.div layout className="w-28 h-12 bg-[#00FF3A] rounded-xl overflow-hidden mt-1 sm:mt-0">
      <div className="h-[30%] bg-white w-full flex items-center justify-center text-black text-[11px] font-bold font-poppins">
        VENUE
      </div>
      <div className="h-[2px] bg-white w-full" />
      <div className="h-full flex items-center justify-center font-montserrat text-[#292929] text-xs font-medium bg-gradient-to-b from-[#2EB24C] to-white text-center px-1">
        {venue}
      </div>
    </motion.div>
  </div>
</motion.div>

    {/* Buttons */}
    <motion.div
  layout
  className="flex justify-center gap-2 mt-4 sm:mt-4 flex-nowrap px-2"
>
  <button className="inline-flex items-center gap-1 px-1 py-1.5 bg-[#2EB24C] text-black rounded-3xl text-xs sm:text-sm font-semibold font-syne hover:scale-105 transition whitespace-nowrap">
    Register
  </button>
  <button className="inline-flex items-center gap-1 px-1 py-1.5 bg-[#2EB24C] text-black rounded-3xl text-xs sm:text-sm font-semibold font-syne hover:scale-105 transition whitespace-nowrap">
    Learn More
  </button>
</motion.div>

  </motion.div>
</motion.div>

          </motion.div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-x-4 ">
            {bottomRow.map((card) => renderCard(card, false))}
          </div>
        </>
      );
    } else {
      // ✅ 2-2-1 layout when nothing tapped
      const topRow = allCards.slice(0, 2);
      const middleRow = allCards.slice(2, 4);
      const centerCard = allCards[4];

      return (
        <>
          {/* Top Row */}
          <div className="grid grid-cols-2 gap-x-4 mb-8"> 
            {topRow.map((card) => renderCard(card, false))}
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-2 gap-x-4 mb-8">
            {middleRow.map((card) => renderCard(card, false))}
          </div>

          {/* Centered Fifth Card */}
          <div className="flex justify-center">
            <div className="w-[48%]">
              {renderCard(centerCard, false)}
            </div>
          </div>
        </>
      );
    }
  })()}
</div>


    </section>
  );
};