import React, { useRef, useEffect, useState } from "react";

const ImageScrollGallery = ({ images, texts }) => {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [progressArr, setProgressArr] = useState([0, 0, 0, 0, 0]);
  const [imageCenters, setImageCenters] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    let running = false;
    const updateScroll = () => {
      setProgressArr(refs.map(ref => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top >= windowHeight || rect.bottom <= 0) return 0;
        const visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        return Math.max(0, Math.min(1, visible / rect.height));
      }));

      setImageCenters(refs.map(ref => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        return rect.top + rect.height / 2;
      }));

      running = false;
    };

    const onScroll = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getTextTransform = (idx) => {
    const windowHeight = window.innerHeight;
    const centerY = imageCenters[idx];
    const startY = windowHeight;
    const endY = windowHeight / 2;
    const outY = 0;

    let x = 120;
    let targetX = 60;
    let outX = -30;

    if (idx === 0) {
      targetX = 40;
      outX = -120;
    }
    if (idx === 1 || idx === 3) targetX = 40;
    if (idx === 2) targetX = 50;
    if (idx === 4) {
      targetX = 60;
      outX = 40;
    }

    if (centerY >= startY) {
      x = 120;
    } else if (centerY > endY) {
      x = 120 - ((120 - targetX) * ((startY - centerY) / (startY - endY)));
    } else if (centerY > outY) {
      x = idx === 4 ? 40 : targetX - ((targetX - outX) * ((endY - centerY) / (endY - outY)));
    } else {
      x = idx === 4 ? 40 : outX;
    }

    return `translateY(-50%) translateX(${x}vw)`;
  };

  const imageContainerStyles = [
    { left: "5vw", top: "50%", transform: "translateY(-50%)" },
    { right: "5vw", top: "50%", transform: "translateY(-50%)" },
    { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
    { right: "5vw", top: "50%", transform: "translateY(-50%)" },
    { left: "5vw", top: "50%", transform: "translateY(-50%)" }
  ];

  return (
    <div>
      {[0, 1, 2, 3, 4].map(idx => {
        const isStickyLast = idx === 4 && imageCenters[4] <= window.innerHeight / 2;
        return (
          <section
            key={idx}
            ref={refs[idx]}
            className="h-screen w-screen flex items-center justify-center relative px-2 sm:px-4 md:px-0 overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
              <div
                className="h-screen bg-fixed bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://i.ibb.co/G3QdKhqs/Gallery-Grid.png')",
                }}
              />
            </div>

            {/* Image and Text */}
            <div className="w-full h-full relative overflow-hidden">
              {/* Image */}
              <div
                style={{
                  position: "absolute",
                  ...imageContainerStyles[idx],
                  zIndex: idx === 2 ? 2 : 10,
                }}
              >
                <img
                  src={images[idx]}
                  alt="Gallery"
                  className="object-cover block rounded-xl shadow-xl transition-transform duration-200"
                  style={{
                    height: window.innerWidth < 768 ? '40vh' : '60vh',
                    width: 'auto',
                  }}
                />
              </div>

              {/* Text */}
              <span
                className="font-bold text-white px-4 py-2 whitespace-nowrap pointer-events-none"
                style={{
                  position: isStickyLast ? 'absolute' : 'fixed',
                  top: '50%',
                  left: isStickyLast ? '20vw' : 0,
                  transform: isStickyLast ? 'translateY(-50%)' : getTextTransform(idx),
                  transition: 'left 0.2s linear, transform 0.2s linear',
                  zIndex: idx === 2 ? 10 : 0,
                  textShadow: '0 8px 32px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.8)',
                  fontSize: window.innerWidth < 768 ? '1.5rem' : '4rem'
                }}
              >
                {texts[idx]}
              </span>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ImageScrollGallery;

// Smooth scrolling
if (typeof window !== "undefined") {
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.style.scrollBehavior = "smooth";
}
