import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CARD_DATA = [
  { id: 0, img: 'https://ik.imagekit.io/d73k0qzwc/Frame%2073.png' },
  { id: 1, img: 'https://ik.imagekit.io/d73k0qzwc/Frame%2070.png' },
  { id: 2, img: 'https://ik.imagekit.io/d73k0qzwc/Frame%2067.png' },
  { id: 3, img: 'https://ik.imagekit.io/d73k0qzwc/Frame%2079.png' },
  { id: 4, img: 'https://ik.imagekit.io/d73k0qzwc/Frame%2076.png' },
];

const EventsHero = () => {
  const containerRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let totalCards = CARD_DATA.length;
      let sections = totalCards - 2;

      gsap.to({}, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${sections * 1000}`,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            let index = Math.round(self.progress * sections);
            setCardIndex(index);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getCardStyle = (i) => {
    const offset = i - cardIndex;
    const baseZ = 30 - Math.abs(offset);

    if (offset === -2 || offset === 2) return { opacity: 0, display: 'none' };

    const positions = [
      {
        width: '156px',
        height: '210px',
        transform: 'translateX(-460px) scale(0.8) translateY(60px)',
      },
      {
        width: '249px',
        height: '359px',
        transform: 'translateX(-180px) scale(0.9) translateY(30px)',
      },
      {
        width: '428px',
        height: '550px',
        transform: 'translateX(200px) scale(1) translateY(0)',
      },
    ];

    const pos = offset + 1;
    if (pos < 0 || pos > 2) return { opacity: 0, display: 'none' };
    return {
      ...positions[pos],
      zIndex: baseZ + pos,
      opacity: 1,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      transition: 'all 0.6s ease-in-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black overflow-hidden relative"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-8 relative flex items-center justify-between">
          {/* Text */}
          <div className="flex-1 mt-[400px] space-y-3">
            <div className="text-white/60 text-m font-medium tracking-widest">
              NAVIGATE BY SCROLLING
            </div>
            <h1 className="text-[200px] font-extrabold text-white leading-none tracking-tight">
              Events
            </h1>
          </div>

          {/* Cards */}
          <div className="flex-1 flex items-start justify-center relative h-[600px] pt-[60px]">
            {CARD_DATA.map((card, i) => {
              const style = getCardStyle(i);
              return (
                <div
                  key={card.id}
                  className="absolute rounded-2xl overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    ...style,
                    backgroundColor: 'white',
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHero;
