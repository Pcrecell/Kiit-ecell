import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { highlights } from "../../assets/Image Links";
import { Skeleton } from "@mui/material";

const images = [
  {
    image: highlights.highlights_1.link,
    loading: "lazy",
    alt: highlights.highlights_1.alt,
  },
  {
    image: highlights.highlights_2.link,
    loading: "lazy",
    alt: highlights.highlights_2.alt,
  },
  {
    image: highlights.highlights_3.link,
    loading: "lazy",
    alt: highlights.highlights_3.alt,
  },
  {
    image: highlights.highlights_4.link,
    loading: "lazy",
    alt: highlights.highlights_4.alt,
  },
  {
    image: highlights.highlights_5.link,
    loading: "lazy",
    alt: highlights.highlights_5.alt,
  },
  {
    image: highlights.highlights_6.link,
    loading: "lazy",
    alt: highlights.highlights_6.alt,
  },
  {
    image: highlights.highlights_7.link,
    loading: "lazy",
    alt: highlights.highlights_7.alt,
  },
  {
    image: highlights.highlights_8.link,
    loading: "lazy",
    alt: highlights.highlights_8.alt,
  },
  {
    image: highlights.highlights_9.link,
    loading: "lazy",
    alt: highlights.highlights_9.alt,
  },
  {
    image: highlights.highlights_10.link,
    loading: "lazy",
    alt: highlights.highlights_10.alt,
  },
  {
    image: highlights.highlights_11.link,
    loading: "lazy",
    alt: highlights.highlights_11.alt,
  },
];

const Highlights = () => {
  const [loadedImages, setLoadedImages] = React.useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const gradientCenterX = (mouseX / window.innerWidth) * 100;
      const gradientCenterY = (mouseY / window.innerHeight) * 100;

      const revealedArea = document.querySelector(".revealed-area");
      // Add null check to prevent the error
      if (revealedArea) {
        revealedArea.style.background = `radial-gradient(circle at ${gradientCenterX}% ${gradientCenterY}%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.9) 30%)`;
      }
    };

    // Add a small delay to ensure the DOM is fully rendered
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousemove", handleMouseMove);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col gap-12 p-4 justify-center items-center lg:block w-full bg-black text-white relative">
      {/* Title Section For Small Screens */}
      <div className="lg:hidden flex justify-center items-center text-center mb-4">
        <div className="w-full h-[100px]">
          <div className="float-left">
            <h1 className="text-6xl font-bold font-milker">HIGH</h1>
          </div>
          <div className="float-right mt-5">
            <h1 className="text-7xl font-light font-transcity">lights</h1>
          </div>
        </div>
      </div>

      {/* Small Screens: Carousel */}
      <div className="block lg:hidden w-full">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {images.map((object, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[50vh] relative">
                {!loadedImages[`mobile-${index}`] && (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
                    animation="pulse"
                  />
                )}
                <img
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loadedImages[`mobile-${index}`] ? "opacity-100" : "opacity-0"
                  }`}
                  src={object.image}
                  alt={object.alt}
                  fetchPriority="low"
                  loading={object.loading}
                  onLoad={() => handleImageLoad(`mobile-${index}`)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Large Screens: Grid */}
      <div
        id="highlights"
        className="hidden lg:grid w-full min-h-screen grid-cols-4 grid-rows-3 gap-4"
      >
        {images.map((object, index) => {
          if (index === 4) {
            return (
              <div
                key={index}
                className="col-span-2 row-start-2 col-start-2 flex justify-center items-center text-center z-10"
              >
                <h1 className="text-8xl font-bold font-milker ">
                  HIGH
                  <span className="text-9xl font-transcity font-light align-top pl-[13px]">
                    lights
                  </span>
                </h1>
              </div>
            );
          }
          return (
            <div key={index} className="relative w-full h-full">
              {!loadedImages[`grid-${index}`] && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
                  animation="pulse"
                />
              )}
              <img
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  loadedImages[`grid-${index}`] ? "opacity-100" : "opacity-0"
                }`}
                src={object["image"]}
                alt={object["alt"]}
                onLoad={() => handleImageLoad(`grid-${index}`)}
              />
            </div>
          );
        })}
      </div>

      <div className="revealed-area"></div>
    </section>
  );
};

export default Highlights;