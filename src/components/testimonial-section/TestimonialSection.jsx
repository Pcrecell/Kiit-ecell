import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../ui/card';
import { InteractiveGridPattern } from './interactive-grid-pattern'; // Assuming you have this component
import testimonialsData from './Testimonials.json';
import './TestimonialCarousel.css';

const testimonials = testimonialsData;

const duplicatedTopRow = [...testimonials, ...testimonials];
const duplicatedBottomRow = [...[...testimonials].reverse(), ...[...testimonials].reverse()];

const TestimonialSection = () => {
  const [isPausedTop, setIsPausedTop] = useState(false);
  const [isPausedBottom, setIsPausedBottom] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const slideContainerRef = useRef(null);

  const topAnimationFrameId = useRef(null);
  const bottomAnimationFrameId = useRef(null);

  // Optimized mobile detection with debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobileOrTablet(window.innerWidth < 1024);
      }, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Auto-advance slides on mobile/tablet
  useEffect(() => {
    if (!isMobileOrTablet) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [isMobileOrTablet]);

  
  const handleTouchStart = (e) => {
    setTouchEnd(0); 
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }
    
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };


  const animateTopRow = useCallback(() => {
    if (topRowRef.current && !isPausedTop) {
      if (topRowRef.current.scrollLeft >= topRowRef.current.scrollWidth / 2) {
        topRowRef.current.scrollLeft = 0;
      } else {
        topRowRef.current.scrollLeft += 1; 
      }
    }
    
    if (!isPausedTop) {
      topAnimationFrameId.current = requestAnimationFrame(animateTopRow);
    }
  }, [isPausedTop]); 
  const animateBottomRow = useCallback(() => {
    if (bottomRowRef.current && !isPausedBottom) {
      if (bottomRowRef.current.scrollLeft <= 0) {
        bottomRowRef.current.scrollLeft = bottomRowRef.current.scrollWidth / 2;
      } else {
        bottomRowRef.current.scrollLeft -= 1.05;
      }
    }
    if (!isPausedBottom) {
      bottomAnimationFrameId.current = requestAnimationFrame(animateBottomRow);
    }
  }, [isPausedBottom]); 
  useEffect(() => {
    // Only animate on desktop
    if (!isMobileOrTablet) {
      topAnimationFrameId.current = requestAnimationFrame(animateTopRow);
      bottomAnimationFrameId.current = requestAnimationFrame(animateBottomRow);
    }

    return () => {
      cancelAnimationFrame(topAnimationFrameId.current);
      cancelAnimationFrame(bottomAnimationFrameId.current);
    };
  }, [animateTopRow, animateBottomRow, isMobileOrTablet]); 

  // Memoized testimonial card component to prevent unnecessary re-renders
  const TestimonialCard = React.memo(({ testimonial, keyPrefix, className = "" }) => (
    <Card className={`flex-shrink-0 w-[420px] p-6 bg-black/95 backdrop-blur-sm shadow-md hover:shadow-white hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden ${className}`}>
      <div className="flex flex-col h-full text-wrap break-words">
        <p className="flex-grow text-gray-100 mb-4">
          "{testimonial.quote}"
        </p>
        <div className="mt-auto">
          <h3 className="font-semibold text-blue-500">
            {testimonial.author}
          </h3>
          <p className="text-gray-400 text-sm">
            {testimonial.position}
          </p>
        </div>
      </div>
    </Card>
  ));

  return (
    <section className="relative w-full py-8 md:py-16 lg:py-24 lg:min-h-screen overflow-hidden">
      {/* Grid background */}
      <div className='z-20 relative'>
        <h2 className="text-4xl md:text-6xl lg:text-8xl text-white font-transcity text-center z-20 mb-8 md:mb-12">Life At E-Cell</h2>
      </div>
      <InteractiveGridPattern className='z-[0]'></InteractiveGridPattern>

      <div className="container mx-auto px-4 md:px-2">
        {isMobileOrTablet ? (
          // Mobile and Tablet layout - Carousel/Slider
          <div className="testimonial-carousel relative max-w-2xl mx-auto mb-4">
            {/* Testimonial Slider */}
            <div 
              ref={slideContainerRef}
              className="relative overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="testimonial-slide flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={`slide-${index}`} className="w-full flex-shrink-0">
                    <Card className="testimonial-card w-full p-6 md:p-8 bg-black/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 min-h-[300px] md:min-h-[350px]">
                      <div className="flex flex-col h-full text-wrap break-words">
                        <div className="text-content flex-grow flex items-center">
                          <p className="text-gray-100 text-base md:text-lg leading-relaxed text-justify">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        <div className="author-content mt-6 text-center border-t border-gray-700/50 pt-4">
                          <h3 className="font-semibold text-blue-400 text-lg md:text-xl">
                            {testimonial.author}
                          </h3>
                          <p className="text-gray-400 text-sm md:text-base mt-1">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="nav-button absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-600/30"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="nav-button absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-gray-600/30"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`pagination-dot w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'active bg-blue-500 shadow-lg shadow-blue-500/50'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-2 w-full bg-gray-700/30 rounded-full h-1">
              <div 
                className="progress-bar bg-gradient-to-r from-blue-500 to-blue-400 h-1 rounded-full transition-all duration-4000 ease-linear"
                style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          // Desktop layout - Horizontal scrolling (1024px and above)
          <>
            {/* Top row */}
            <div className="relative mb-8 w-[130%] justify-self-center">
              {/* Left fade */}
              <div className="absolute left-0 top-0 h-full w-24 z-30 pointer-events-none bg-gradient-to-r from-black to-transparent" />
              {/* Right fade */}
              <div className="absolute right-0 top-0 h-full w-24 z-30 pointer-events-none bg-gradient-to-l from-black to-transparent" />
              
              <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPausedTop(true)} 
                onMouseLeave={() => setIsPausedTop(false)}
              >
                <div 
                  ref={topRowRef}
                  className="relative flex gap-6 py-2 overflow-x-hidden"
                >
                  {duplicatedTopRow.map((testimonial, index) => (
                    <Card 
                      key={`top-${index}`} 
                      className="inline-block w-80 min-w-[420px] max-w-[420px] p-6 bg-black/95 backdrop-blur-sm duration-300 rounded-xl overflow-hidden"
                    >
                      <div className="flex flex-col h-full text-wrap break-words">
                        <p className="flex-grow text-gray-100 mb-4">
                          {testimonial.quote}
                        </p>
                        <div className="mt-auto">
                          <h3 className="font-semibold text-blue-500">
                            {testimonial.author}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="relative w-[130%] justify-self-center">
              {/* Left fade */}
              <div className="absolute left-0 top-0 h-full w-24 z-30 pointer-events-none bg-gradient-to-r from-black to-transparent" />
              {/* Right fade */}
              <div className="absolute right-0 top-0 h-full w-14 z-30 pointer-events-none bg-gradient-to-l from-black to-transparent" />
              
              <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPausedBottom(true)} 
                onMouseLeave={() => setIsPausedBottom(false)}
              >
                <div 
                  ref={bottomRowRef}
                  className="flex gap-6 py-2 overflow-x-auto whitespace-nowrap hide-carousel"
                >
                  {duplicatedBottomRow.map((testimonial, index) => (
                    <Card 
                      key={`bottom-${index}`} 
                      className="flex-shrink-0 w-80 min-w-[420px] max-w-[420px] p-6 bg-black/95 backdrop-blur-sm duration-300 rounded-xl overflow-hidden"
                    >
                      <div className="flex flex-col h-full text-wrap break-words">
                        <p className="flex-grow text-gray-100 mb-4">
                          {testimonial.quote}
                        </p>
                        <div className="mt-auto">
                          <h3 className="font-semibold text-blue-500">
                            {testimonial.author}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialSection;