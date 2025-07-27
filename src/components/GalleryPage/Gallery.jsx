import { useEffect, useState } from "react";
import NavbarD from "../navbar/NavbarD";
import Footer from "../Footer/Footer";
import PolaroidImages from "./PolaroidImages";
import BentoGrid from "./BentoGrid";
import { AnimatePresence, motion } from "framer-motion";
import RotatingText from "./RotatingText";



const DropInText = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.span
      style={{ display: "inline-block", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
      key={text}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letter}
          style={{ display: "inline-block" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const images = [
 
  {
    image: "https://i.postimg.cc/kgg0YpxD/Life-at-ecell-cropped.jpg",
    content: "Life at E-Cell",
  },
  {
    image: "https://i.postimg.cc/fk4B16nY/D24-0038-album-cover.avif",
    content: "Mavericks 2025",
  },
  {
    image: "https://i.postimg.cc/tTZcfdnQ/D24-0028-album-cover.avif",
    content: "I Camp",
  },
  {
    image: "https://i.postimg.cc/kgg0YpxD/Life-at-ecell-cropped.jpg",
    content: "Life at E-Cell",
  },
  {
    image: "https://i.postimg.cc/8Cq472c9/DSC06444-album-cover.avif",
    content: "Hult Prize 2023",
  },
  {
    image: "https://i.postimg.cc/HshBPdYX/ADI-2300-2.avif",
    content: "I Camp 2022",
  },
  {
    image: "https://i.postimg.cc/t4nVsY6R/DSC0322-1-album-cover.avif",
    content: "Flash Mob",
  },
  {
    image: "https://i.postimg.cc/kgg0YpxD/Life-at-ecell-cropped.jpg",
    content: "Life at E-Cell",
  },
  {
    image: "https://i.postimg.cc/6pPLPkrq/DSC04639-album-potential.avif",
    content: "Hult Prize 2024",
  },
  {
    image: "https://i.postimg.cc/3JLB67BY/DSC08728-1.avif",
    content: "E-Summit 2022",
  },
  {
    image: "https://i.postimg.cc/tCq6sSkJ/1748849096-gbm-crpped-album-cover.avif",
    content: "General Body Meeting",
  },
  {
    image: "https://i.postimg.cc/6pPLPkrq/DSC04639-album-potential.avif",
    content: "Hult Prize 2024",
  },
  {
    image: "https://i.postimg.cc/kgg0YpxD/Life-at-ecell-cropped.jpg",
    content: "Life at E-Cell",
  },
  {
    image: "https://i.postimg.cc/6pPLPkrq/DSC04639-album-potential.avif",
    content: "Hult Prize 2024",
  },
  {
    image: "https://i.postimg.cc/3JLB67BY/DSC08728-1.avif",
    content: "E-Summit 2022",
  },
  {
    image: "https://i.postimg.cc/tCq6sSkJ/1748849096-gbm-crpped-album-cover.avif",
    content: "General Body Meeting",
  },
  {
    image: "https://i.postimg.cc/6pPLPkrq/DSC04639-album-potential.avif",
    content: "Hult Prize 2024",
  }

];

const Glimpse = () => {
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const total = images.length;
  const frontIndex = images.reduce((closestIndex, _, i) => {
  const angle = ((360 / total) * (i + angleOffset)) % 360;
  const distanceToFront = Math.min(Math.abs(angle), 360 - Math.abs(angle));
  const closestAngle = ((360 / total) * (closestIndex + angleOffset)) % 360;
  const closestDistance = Math.min(Math.abs(closestAngle), 360 - Math.abs(closestAngle));
  return distanceToFront < closestDistance ? i : closestIndex;
}, 0);



  return (
    <div>
      <NavbarD />
      <div className="relative min-h-[60vh] bg-[black] overflow-hidden">
        {/* Black blurred corners and polaroid images*/}
        <div className="absolute inset-0 pointer-events-none z-0">
          <PolaroidImages />
          {/* Top Left */}
          <div className="absolute top-[-20vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

          {/* Top Right */}
          <div className="absolute top-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

          {/* Bottom Left */}
          <div className="absolute bottom-[-10vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

          {/* Bottom Right */}
          <div className="absolute bottom-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

          {/* Glowy Stars */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse">
              ✦
            </div>
            <div className="absolute top-[27%] left-[80%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-600">
              ✦
            </div>
            <div className="absolute top-[82%] left-[50%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-500">
              ✦
            </div>
            <div className="absolute top-[85%] left-[20%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-700">
              ✦
            </div>
            <div className="absolute top-[30%] left-[65%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-1000">
              ✦
            </div>
            <div className="absolute top-[50%] left-[65%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-1000">
              ✦
            </div>
            <div className="absolute top-[60%] left-[90%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-1000">
              ✦
            </div>
            <div className="absolute top-[20%] left-[30%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-1000">
              ✦
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 px-4 flex items-center justify-center min-h-screen translate-y-36 mb-36 md:mb-0 md:translate-y-0">

          <div className="absolute px-10 text-white top-0 max-w-screen-xl w-full flex flex-col md:translate-x-17 md:flex-row items-center justify-start gap-6 md:relative md:px-0 lg:relative lg:px-0">
            {/* Text Section */}
            <div className="text-center mb-8 md:mb-0 md:translate-x-[7vw] md:text-left">


              <div className="font-milker text-4xl mt-[-40px] md:text-5xl font-bold mb-2 md:mb-4 tracking-wider">
                A Glimpse <br /> of Our Journey
              </div>
              <div className="hidden md:text-2xl text-gray-300">
                Memories, Movements
                <br /> and Moments.
              </div>
            </div>

            {/* Image Stack */}

            <div className="transform -translate-x-[10vh] scale-[1.1] md:scale-[0.7] md:translate-x-[0] lg:translate-x-[0]">


              <div className="relative w-[70vw] sm:w-[60vw] md:w-[28rem] h-[52vw] sm:h-[45vw] md:h-[21rem]">
                
                {images.map((img, i) => {
                    const src = img.image;
                    const content = img.content;
                  const angle = ((360 / total) * (i + angleOffset)) % 360;
                  const radians = (angle * Math.PI) / 180;

                  const isMobile = window.innerWidth < 768;
                  const radiusX = isMobile ? 22 : 20;
                  const radiusY = isMobile ? 17 : 14;

                  const x = radiusX * Math.cos(radians);
                  const y = radiusY * Math.sin(radians);
                  const normalizedX = Math.cos(radians);

                  const frontIndex = images.reduce((closestIndex, _, i) => {
                    const angle = ((360 / total) * (i + angleOffset)) % 360;
                    const distanceToFront = Math.min(
                      Math.abs(angle),
                      360 - Math.abs(angle)
                    );
                    const closestAngle =
                      ((360 / total) * (closestIndex + angleOffset)) % 360;
                    const closestDistance = Math.min(
                      Math.abs(closestAngle),
                      360 - Math.abs(closestAngle)
                    );
                    return distanceToFront < closestDistance ? i : closestIndex;
                  }, 0);

                  const isFront = i === frontIndex;
                  // let isLast = i === images.length - 1;

                  let scale;
                  if (isMobile) {
                    scale = 0.35 + Math.pow(normalizedX + 1, 1.2) * 0.12;
                  } else {
                    scale = 0.65 + Math.pow(normalizedX + 1, 1.5) * 0.2;
                  }

                  scale = Math.max(0.2, Math.min(scale, 2.0));

                  if (isFront) scale *= 2;

                  const zIndex = Math.round((normalizedX + 1) * 50);
                  const opacity = 0.1 + 0.9 * ((normalizedX + 1) / 2);

                  const isLeftish = angle > 130 && angle < 230;
                  const isBottomLeft = isLeftish && y >= 0;
                  const extraMarginY = isBottomLeft ? 4 : 2;

                  return (
                    <div
                      key={src + i}
                      className={`absolute top-1/2 left-1/2 transition-transform duration-[3000ms] ease-in-out ${
                        isFront ? "grayscale-0" : "grayscale"
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}vw, ${
                          y + extraMarginY
                        }vw) scale(${scale})`,
                        zIndex,
                        opacity,
                        willChange: "transform, opacity",
                      }}
                    >
                      <div className="relative w-full h-auto max-w-[100%] rounded-xl">
                        {/* Show frame if this is the front image */}
                       {isFront && (
  <>
    {/* Frame with black background and border */}
    <div className="absolute inset-[-8px] z-0 pointer-events-none rounded-2xl border border-[#999999] shadow-[0_0_30px_10px_rgba(255,255,255,0.08)] bg-black/85 md:inset-[-15px]" />
  </>
)}


                        <img
                          src={src}
                          alt={`image-${i}`}

                          className="w-full h-full object-cover rounded-xl relative z-10"


                        />
                      </div>
                    </div>
                  );
                })}
              </div>
             


            </div>
             <h2 className="mt-10 text-xl sm:text-xl font-bold tracking-wide md:hidden">
    KIIT E-CELL PRESENTS
  </h2>
         <div className=" md:hidden text-center text-white font-serifDisplay">
  <div className=" text-xl sm:text-lg font-semibold text-center">
    <RotatingText
      texts={[images[frontIndex]?.content || ""]}
      mainClassName="inline-block"
      staggerFrom="last"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-1"
      transition={{ type: "spring", damping: 30, stiffness: 100 }}
      rotationInterval={3000}
    />
  </div>
</div>



          </div>
        </div>
      </div>
      
      {/* BentoGrid Section with same background */}
      <div className="relative bg-[black] overflow-hidden">
        {/* Background elements for BentoGrid section */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Black blurred corners */}
          <div className="absolute top-[-10vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
          <div className="absolute top-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
          <div className="absolute bottom-[-10vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
          <div className="absolute bottom-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

          {/* Glowy Stars for BentoGrid section */}
        </div>

        {/* BentoGrid Component */}
        <div className="relative z-10  md:mb-24">
          <div>
            <h1 className="text-5xl md:text-[5rem] tracking-wider text-center w-full font-transcity text-white mb-8 md:mb-10 md:mt-12">Captured Event Moments</h1>
          </div>
          <BentoGrid />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Glimpse;