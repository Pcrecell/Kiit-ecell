import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { past_speakers } from "../../assets/Image Links";
import { Skeleton } from "@mui/material";


const PastSpeakers = () => {
  const scrollRef = useRef(null);
  const cardsRef = useRef(null);
  const textRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [loadedImages, setLoadedImages] = useState(Array(9).fill(false));
  const [erroredImages, setErroredImages] = useState(Array(9).fill(false));
 
  const speakers = [
    { name: "Sandeep Jain", designation: "Founder & CEO at GeeksforGeeks", image: past_speakers.speaker_9.link, alt: past_speakers.speaker_9.alt },
    { name: "Anand Panda", designation: "Business Head at Billdesk", image: past_speakers.speaker_8.link, alt: past_speakers.speaker_8.alt },
    { name: "Akshay Gurnani", designation: "Co-Founder & Former CEO of Schbang", image: past_speakers.speaker_5.link, alt: past_speakers.speaker_5.alt },
    { name: "Debendra Pradhan", designation: "Director & CEO of Coratia Technologies", image: past_speakers.speaker_7.link, alt: past_speakers.speaker_7.alt },
    { name: "Shashi Tharoor", designation: "Member of Parliament", image: past_speakers.speaker_1.link, alt: past_speakers.speaker_1.alt },
    { name: "Rakhi Pal", designation: "Co-Fouder & COO of Eventbeep", image: past_speakers.speaker_6.link, alt: past_speakers.speaker_6.alt },
    { name: "Sudeep Gupta", designation: "CEO and Co-founder of Store My Goods", image: past_speakers.speaker_2.link, alt: past_speakers.speaker_2.alt },
    { name: "Arsh Goyal", designation: "Senior Software Engineer at Samsung", image: past_speakers.speaker_3.link, alt: past_speakers.speaker_3.alt },
    { name: "Dan Ram", designation: "6x TEDx speaker", image: past_speakers.speaker_4.link, alt: past_speakers.speaker_4.alt },
    { name: "Jayashree Mohanty", designation: "Co-founder and president at Luminous Infoways(p) ltd.", image: past_speakers.speaker_10.link, alt: past_speakers.speaker_10.alt }
  ];

  const duplicatedSpeakers = Array(10).fill(speakers).flat(); // ensures long loop

  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => {
      const arr = [...prev];
      arr[idx] = true;
      return arr;
    });
  };

  const handleImageError = (idx) => {
    setErroredImages((prev) => {
      const arr = [...prev];
      arr[idx] = true;
      return arr;
    });
  };

  useEffect(() => {
  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    textRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const textY = rect.top + rect.height / 2;
      const distance = Math.abs(mousePos.current.y - textY);
      const maxDistance = 200;
      const opacity = 0.3 + Math.max(0, 1 - distance / maxDistance) * 0.7;
      el.style.opacity = Math.min(opacity, 1);
    });
  };
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

 useEffect(() => {
  const container = cardsRef.current;

  const scrollDistance = container.scrollWidth / 3;

  let direction = 1; // 1 = left, -1 = right


const totalDistance = container.scrollWidth / 3;

const loop = gsap.to(container, {
  x: () => -totalDistance * direction,
  duration: 90,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: (x) => {
      const raw = parseFloat(x);
      const mod = ((raw % -totalDistance) + -totalDistance) % -totalDistance;
      return `${mod}px`;
    },
  },
});


  let isDragging = false;
  let startX = 0;
  let lastTime = 0;
  let holdTimeout;
let isHolding = false;

  const getX = (e) =>
    e.touches?.length ? e.touches[0].clientX : e.clientX;

  const onDragStart = (e) => {
  isDragging = true;
  startX = getX(e);
  lastTime = Date.now();
  container.classList.add("cursor-grabbing");

  // Pause if user holds > 300ms
  holdTimeout = setTimeout(() => {
    isHolding = true;
    loop.pause();
  }, 300);
};


const onDragMove = (e) => {
  if (!isDragging) return;
  const currentX = getX(e);
  const deltaX = currentX - startX;
  const velocity = deltaX / (Date.now() - lastTime + 1);

  const isTouch = e.type.startsWith("touch");
  const speedMultiplier = isTouch ? 40 : 20;
  const speedBoost = Math.min(Math.max(Math.abs(velocity * speedMultiplier), 0.5), isTouch ? 8 : 4);

  direction = deltaX > 0 ? -1 : 1;
  loop.vars.x = () => -scrollDistance * direction;
  loop.invalidate().restart();

  // Instead of setting timeScale instantly:
  gsap.to(loop, {
    timeScale: Math.abs(speedBoost),
    duration: 0.3,
    ease: "power2.out"
  });

  startX = currentX;
  lastTime = Date.now();
};




  const onDragEnd = () => {
  isDragging = false;
  container.classList.remove("cursor-grabbing");
  clearTimeout(holdTimeout);

  if (!isHolding) {
    gsap.to(loop, { timeScale: 1, duration: 1, ease: "power2.out" });
  } else {
    loop.play(); // resume auto-scroll
  }

  isHolding = false;
};


  // Attach both mouse and touch listeners
  container.addEventListener("mousedown", onDragStart);
  container.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);

  container.addEventListener("touchstart", onDragStart, { passive: true });
  container.addEventListener("touchmove", onDragMove, { passive: true });
  window.addEventListener("touchend", onDragEnd);

  return () => {
    loop.kill();
    clearTimeout(holdTimeout);
    container.removeEventListener("mousedown", onDragStart);
    container.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);

    container.removeEventListener("touchstart", onDragStart);
    container.removeEventListener("touchmove", onDragMove);
    window.removeEventListener("touchend", onDragEnd);
  };
}, []);


  return (
    <div className="relative bg-black text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>


      <div
  className="absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none z-10 leading-[4rem] sm:leading-[6rem] md:leading-[8rem] xl:leading-[10rem]"
>
  {Array.from({ length: 3 }).map((_, i) => (
    <h1
      key={i}
      ref={(el) => (textRefs.current[i] = el)}
      className="text-[2rem] min-[350px]:text-[3rem] min-[450px]:text-[4rem] sm:text-[6rem] md:text-[7rem] lg:text-[10rem] font-bold font-transcity tracking-wider opacity-20 transition-all duration-200 ease-out cursor-pointer text-center px-2"
    >
      Past Speakers
    </h1>
  ))}
</div>

      <div className="hidden md:flex absolute top-4 right-4 z-30 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full gap-2 animate-blink opacity-60">
        <div className="flex items-center gap-2">
          <span className="text-xl text-white font-medium font-milker">Drag</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white fill-current transition-transform hover:translate-x-1" viewBox="0 0 24 24">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </div>
      </div>
      <div ref={scrollRef} className="relative z-10 flex w-full h-[100vh] px-4  overflow-hidden md:cursor-grab select-none mt-12 ">

        <div
          ref={cardsRef}
          className="flex w-max gap-[8vw]"
          style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
        >
          {duplicatedSpeakers.map((speaker, index) => (
           <div
  key={index}
  className={`speaker-card flex-shrink-0 w-[90vw] sm:w-[45vw] md:w-[37.5vw] aspect-[16/9] relative rounded-xl shadow-md overflow-hidden
    ${index % 2 === 0

  ? "translate-y-[-6rem] sm:translate-y-[-2rem] self-end"
  : "translate-y-[6rem] sm:translate-y-[2rem] self-start"}
    ${index % 2 !== 0 ? "my-2 sm:my-0" : "my-2 sm:my-0"}`}
>

              <div className="absolute inset-0 bg-[#EFEDEB]/90 blur-[1px] z-0" style={{
                backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
                backgroundSize: "15px 15px"
              }} />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full h-full p-3 sm:p-4 gap-2">
                <div className="w-full sm:w-[45%] h-fit flex flex-col items-center sm:items-end justify-center font-PoppinsBold text-center sm:text-right">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl text-black font-extrabold w-full">
                    {speaker.name}
                  </h2>
                  <p className="text-[0.8rem] min-[450px]:text-sm sm:text-base 2xl:text-lg text-gray-600">
                    {speaker.designation}
                  </p>
                </div>
                <div className="flex items-center justify-center rounded-lg shadow-lg p-1 sm:p-2 w-[50%] h-full">
                  <img
                    src={speaker.image}
                    alt={speaker.alt || speaker.name}
                    className={`rounded-lg w-full h-full object-contain transition-opacity duration-700 ${loadedImages[index % 9] ? "opacity-100" : "opacity-0"} ${erroredImages[index % 9] ? "hidden" : ""}`}
                    onLoad={() => handleImageLoad(index % 9)}
                    onError={() => handleImageError(index % 9)}
                    draggable={false}
                  />
                  {(!loadedImages[index % 9] && !erroredImages[index % 9]) && (
                    <Skeleton variant="rectangular" animation="pulse" width="100%" height="100%" sx={{ position: "absolute", borderRadius: "0.5rem" }} />
                  )}
                  {erroredImages[index % 9] && (
                    <Skeleton variant="rectangular" animation="pulse" width="100%" height="100%" sx={{ borderRadius: "0.5rem" }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
  
      </div>
    </div>
  );
};

export default PastSpeakers;
