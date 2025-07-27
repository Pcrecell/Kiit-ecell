import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from '@mui/material';

const HorizontalCardScroll = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [isPressing, setIsPressing] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartProgress, setDragStartProgress] = useState(0);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const cards = [
    { id: 1, title: "E-Summit", imageUrl: "https://ik.imagekit.io/qxzia1tvt/E-Summit_Events_Card.png", path: "/gallery/esummit" },
    { id: 2, title: "i-Camp", imageUrl: "https://ik.imagekit.io/qxzia1tvt/I-Camp_Events_Card.png", path: "/gallery/i-camp" },
    { id: 3, title: "Hult Prize", imageUrl: "https://ik.imagekit.io/qxzia1tvt/Hult-Prize_Events_Card.png", path: "/gallery/hult-prize" },
    { id: 4, title: "Life of an Entrepreneur", imageUrl: "https://ik.imagekit.io/qxzia1tvt/E-Cell-Life_Events_Card.png", path: "/gallery/life-at-ecell" },
    { id: 5, title: "Maverick", imageUrl: "https://ik.imagekit.io/qxzia1tvt/Maverick_Event_Card.png", path: "/gallery/maverick" },
    { id: 6, title: "Build School", imageUrl: "https://ik.imagekit.io/wlknxcf5m/BuildSchoolScrollCard.png", path: "/gallery/build-school" },
  ];

  const maxProgress = cards.length;
  // For desktop: clamp scroll progress so last 3 cards stay fixed at the end
  const maxScroll = Math.max(0, maxProgress - 3);
  // For mobile: wrap scroll progress for infinite loop
  const wrapScrollProgress = (value) => {
    if (value < 0) {
      return maxProgress + (value % maxProgress);
    }
    return value % maxProgress;
  };
  // For desktop: clamp scroll progress
  const clampScrollProgress = (value) => {
    if (value < 0) return 0;
    if (value > maxScroll) return maxScroll;
    return value;
  };
  const navigate = useNavigate()

  const handleCardClick = (card) => {
    navigate(card.path)
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const updateWidth = () => containerRef.current && setContainerWidth(containerRef.current.offsetWidth);
    
    checkMobile();
    updateWidth();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      if (!isPressing) {
        setScrollProgress(prev => wrapScrollProgress(prev + 0.003));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isMobile, isPressing]);

  const handleTouchStart = (e) => {
    setIsPressing(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartProgress(scrollProgress);
  };

  const handleTouchMove = (e) => {
    if (!isPressing || dragStartX === null) return;
    const deltaX = dragStartX - e.touches[0].clientX;
    const deltaProgress = deltaX / 300; // Adjust sensitivity
    let newProgress = dragStartProgress + deltaProgress;
    newProgress = wrapScrollProgress(newProgress);
    setScrollProgress(newProgress);
  };

  const handleTouchEnd = () => {
    setIsPressing(false);
    setDragStartX(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setIsScrollLocked(rect.top <= 100 && rect.bottom >= window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const handleWheel = (e) => {
      if (!isScrollLocked) return;

      const isAtStart = scrollProgress <= 0;
      const isAtEnd = scrollProgress >= maxScroll;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if ((isAtEnd && isScrollingDown) || (isAtStart && isScrollingUp)) {
        document.body.style.overflow = 'auto';
        return;
      }

      document.body.style.overflow = 'hidden';
      e.preventDefault();

      const delta = e.deltaY > 0 ? 0.1 : -0.1;
      setScrollProgress(prev => clampScrollProgress(prev + delta));
      document.body.style.overflow = 'auto';
    };

    const currentRef = containerRef.current;
    if (currentRef) currentRef.addEventListener('wheel', handleWheel, { passive: false });
    return () => currentRef?.removeEventListener('wheel', handleWheel);
  }, [isScrollLocked, scrollProgress, maxScroll, isMobile]);



  const interpolate = (value, inputRange, outputRange) => {
    if (value <= inputRange[0]) return outputRange[0];
    if (value >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];

    for (let i = 1; i < inputRange.length; i++) {
      if (value <= inputRange[i]) {
        const t = (value - inputRange[i - 1]) / (inputRange[i] - inputRange[i - 1]);
        return outputRange[i - 1] * (1 - t) + outputRange[i] * t;
      }
    }
    return outputRange[outputRange.length - 1];
  };

  const getCardStyle = (cardIndex) => {
    const scaleFactor = isMobile ? (window.innerHeight * 0.7) / 560 : (containerWidth / 1200);
    
    if (isMobile) {
      const relativePosition = cardIndex - scrollProgress;
      
      const ranges = {
        input: [-2, -1, 0, 1, 2, 3],
        x: [-850, -565, -335, -30, 350, 850].map(x => x * scaleFactor),
        scale: [0.5, 0.65, 0.75, 0.85, 0.95, 1.05],
        zIndex: [1, 2, 3, 4, 5, 6],
        opacity: [0, 0, 1, 1, 1, 0]
      };

      const baseSize = scaleFactor;
      
      return {
        x: interpolate(relativePosition, ranges.input, ranges.x),
        scale: interpolate(relativePosition, ranges.input, ranges.scale),
        zIndex: Math.round(interpolate(relativePosition, ranges.input, ranges.zIndex)),
        opacity: interpolate(relativePosition, ranges.input, ranges.opacity),
        width: 428 * baseSize * interpolate(relativePosition, ranges.input, ranges.scale),
        height: 560 * baseSize * interpolate(relativePosition, ranges.input, ranges.scale),
      };
    } else {
      const relativePosition = cardIndex - scrollProgress;
      
      const ranges = {
        input: [-1, 0, 1, 2, 3],
        x: [-565, -335, -30, 350, 850].map(x => x * scaleFactor),
        scale: [0.65, 0.75, 0.85, 0.95, 1.05],
        zIndex: [1, 2, 3, 4, 5],
        opacity: [0, 1, 1, 1, 0]
      };

      const baseSize = Math.min(scaleFactor, 1.2);
      
      return {
        x: interpolate(relativePosition, ranges.input, ranges.x),
        scale: interpolate(relativePosition, ranges.input, ranges.scale),
        zIndex: Math.round(interpolate(relativePosition, ranges.input, ranges.zIndex)),
        opacity: interpolate(relativePosition, ranges.input, ranges.opacity),
        width: 428 * baseSize * interpolate(relativePosition, ranges.input, ranges.scale),
        height: 560 * baseSize * interpolate(relativePosition, ranges.input, ranges.scale),
      };
    }
  };

  const renderCard = (card, index, keyPrefix = '') => {
    const style = getCardStyle(index);
    if (style.opacity === 0) return null;
    
    if (isMobile) {
      return (
        <div
          key={`${keyPrefix}${card.id}-${Math.floor(index / cards.length)}`}
          className="absolute top-0 left-1/2 rounded-[20px] cursor-pointer overflow-hidden"
          style={{
            width: style.width,
            height: style.height,
            transformOrigin: "top center",
            transform: `translateX(-50%) translateX(${style.x}px) scale(${style.scale})`,
            zIndex: style.zIndex,
            opacity: style.opacity,
            transition: 'none'
          }}
          onClick={() => handleCardClick(card)}
        >
          <div className="relative w-full h-full">
            {!loadedImages[index] && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                animation="pulse"
              />
            )}
            <img 
              src={card.imageUrl} 
              alt={card.title} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        </div>
      );
    }
    
    return (
      <motion.div
        key={`${keyPrefix}${card.id}`}
        className="absolute top-0 left-1/2 rounded-[20px] cursor-pointer overflow-hidden"
        animate={{ x: style.x, scale: style.scale, opacity: style.opacity, zIndex: style.zIndex }}
        style={{
          width: style.width,
          height: style.height,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          translateX: "-50%",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 80
        }}
      >
        <div className="relative w-full h-full">
          {!loadedImages[index] && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                position: 'absolute',
                top: 0,
                left: 0
              }}
              animation="pulse"
            />
          )}
          <img 
            src={card.imageUrl} 
            alt={card.title} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      </motion.div>
    );
  };

  const containerProps = {
    ref: containerRef,
    className: "relative w-full h-[200vh] overflow-hidden",
    style: { userSelect: "none" },
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onMouseDown: () => setIsPressing(true),
    onMouseUp: () => setIsPressing(false),
    onMouseLeave: () => setIsPressing(false),
  };

  if (isMobile) {
    return (
      <div {...containerProps}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
            {Array.from({ length: 6 }, (_, setIndex) => 
              cards.map((card, cardIndex) => 
                renderCard(card, cardIndex + setIndex * cards.length, `set${setIndex}-`)
              )
            ).flat()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[200vh] overflow-hidden"
      style={{ userSelect: "none" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
          {cards.map((card, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={card.id}
                className="absolute top-0 left-1/2 rounded-[20px] cursor-pointer overflow-hidden"
                animate={{ x: style.x, scale: style.scale, opacity: style.opacity, zIndex: style.zIndex }}
                style={{
                  width: style.width,
                  height: style.height,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  translateX: "-50%",
                }}
                transition={{ type: "spring", stiffness: 800, damping: 80 }}
                onClick={() => handleCardClick(card)}
              >
                <div className="relative w-full h-full">
                  {!loadedImages[index] && (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                      animation="pulse"
                    />
                  )}
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardScroll;