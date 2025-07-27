import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RotatingText from './RotatingText'

const loadingGif1 = "https://res.cloudinary.com/ddyj17gml/image/upload/v1753376757/1_abmrvf.gif";
const loadingGif2 = "https://res.cloudinary.com/ddyj17gml/image/upload/v1753376757/2-optimized_fnjtz8.gif";
const loadingGif3 = "https://res.cloudinary.com/ddyj17gml/image/upload/v1753376757/3_slmx87.gif";

const HeroSection = () => {
  // Check if this is the first visit in this session
  const navigate = useNavigate();

  const isFirstVisit = (() => {
    //if (typeof window !== 'undefined' && window.sessionStorage) {
    //  return !window.sessionStorage.getItem('ecell_hero_seen');
    //}
    return false;
  })();

  // Add loading state for the spinner
  const [loading, setLoading] = useState(true);

  // If not first visit, skip to content phase immediately
  const [phase, setPhase] = useState(isFirstVisit ? 'loading1' : 'content');
  const [gif2Transition, setGif2Transition] = useState(false);
  const [showGif2, setShowGif2] = useState(false);
  const [showGif1, setShowGif1] = useState(true);
  const [gif2FadeIn, setGif2FadeIn] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [gif1Out, setGif1Out] = useState(false);

  // Preload GIFs only if first visit; always preload GIF3
  const [gif1Loaded, setGif1Loaded] = useState(!isFirstVisit);
  const [gif2Loaded, setGif2Loaded] = useState(!isFirstVisit);
  const [gif3Loaded, setGif3Loaded] = useState(false);

  useEffect(() => {
    // Always preload GIF3
    const img3 = new window.Image();
    img3.src = loadingGif3;
    img3.onload = () => setGif3Loaded(true);

    if (isFirstVisit) {
      // Preload GIF1
      const img1 = new window.Image();
      img1.src = loadingGif1;
      img1.onload = () => setGif1Loaded(true);
      // Preload GIF2
      const img2 = new window.Image();
      img2.src = loadingGif2;
      img2.onload = () => setGif2Loaded(true);
    }

    const onLoad = () => setPageLoaded(true);
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, [isFirstVisit]);

  // Loading animation control - remove loading when all GIFs are loaded
  useEffect(() => {
    if (gif1Loaded && gif2Loaded && gif3Loaded) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [gif1Loaded, gif2Loaded, gif3Loaded]);

  // Lock scroll until content phase (only if first visit)
  useEffect(() => {
    if ((isFirstVisit && phase !== 'content') || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase, isFirstVisit, loading]);

  // Animation phase logic with minimum 1s loading and animated GIF1 transform
  const [gif1Transform, setGif1Transform] = useState(false);
  useEffect(() => {
    if (!isFirstVisit) {
      // If not first visit, skip all animation logic
      setShowGif1(false);
      setShowGif2(false);
      setGif2Transition(false);
      setGif2FadeIn(false);
      setGif1Out(false);
      setGif1Transform(false);
      // Mark as seen for future navigations
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('ecell_hero_seen', '1');
      }
      return;
    }
    
    // Don't start animations until loading is complete
    if (loading) return;

    let minLoadingTimer, transitionTimer, hideGif2Timer, gif1TransformTimer, hideGif1Timer, gif2FadeInTimer;
    if (phase === 'loading1') {
      setGif1Transform(false);
      setShowGif1(true);
      setGif2FadeIn(false);
      gif1TransformTimer = setTimeout(() => setGif1Transform(true), 100); // trigger transform after mount
      let minLoadingDone = false;
      let pageLoadedDone = pageLoaded;
      const tryNext = () => {
        if (minLoadingDone && pageLoadedDone && gif1Loaded && gif2Loaded && gif3Loaded) {
          setPhase('loading2');
        }
      };
      minLoadingTimer = setTimeout(() => {
        minLoadingDone = true;
        tryNext();
      }, 1000);
      if (!pageLoaded) {
        const onLoad = () => {
          pageLoadedDone = true;
          tryNext();
        };
        window.addEventListener('load', onLoad, { once: true });
        return () => {
          clearTimeout(minLoadingTimer);
          clearTimeout(gif1TransformTimer);
          window.removeEventListener('load', onLoad);
        };
      } else {
        pageLoadedDone = true;
        tryNext();
        return () => {
          clearTimeout(minLoadingTimer);
          clearTimeout(gif1TransformTimer);
        };
      }
    } else if (phase === 'loading2') {
      setGif2Transition(true);
      setShowGif2(false);
      setShowGif1(true);
      setGif2FadeIn(false);
      setGif1Out(false); // reset

      // Start GIF2 fade in and GIF1 out at the same time, but extend overlap for smoother transition
      gif2FadeInTimer = setTimeout(() => {
        setGif2FadeIn(true);
        setGif1Out(true); // trigger GIF1 out
      }, 70); // slightly longer delay for more natural overlap

      // Extend GIF1 visibility for a longer overlap (1.1s for smoother transition)
      hideGif1Timer = setTimeout(() => setShowGif1(false), 2000);
      // Start GIF3 and text at the exact same time as GIF2's transition ends
      transitionTimer = setTimeout(() => {
        setPhase('content'); // GIF3 and text start immediately
        setShowGif2(true); // show GIF2 under GIF3
        hideGif2Timer = setTimeout(() => setShowGif2(false), 70); // keep GIF2 for 0.2s after GIF3
        // Mark as seen for future navigations
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('ecell_hero_seen', '1');
        }
      }, 2000); // match GIF2's transition duration exactly
      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(hideGif2Timer);
        clearTimeout(hideGif1Timer);
        clearTimeout(gif2FadeInTimer);
      };
    }
  }, [phase, pageLoaded, isFirstVisit, gif1Loaded, gif2Loaded, gif3Loaded, loading]);

  // Show loading spinner until all GIFs are loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] fixed inset-0 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38bdf8]"></div>
      </div>
    );
  }

  return (
    <section className="relative flex items-center min-h-screen w-full bg-black">
      {/* Blurred ellipse spills over to next section */}
      <div
        className="absolute left-[-10vw] bottom-[-120px] w-screen md:w-[600px] h-[350px] pointer-events-none rounded-full"
        style={{
          background: 'rgba(120,196,226,0.5)',
          filter: 'blur(300px)',
          zIndex: 15,
        }}
      />
      {/* Everything else is overflow-hidden */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Phase 1: Full-screen loading GIF1 */}
        {(phase === 'loading1' || (phase === 'loading2' && showGif1)) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] flex justify-center items-center pointer-events-none">
            <img
              src={loadingGif1}
              alt="Loading"
              className="object-contain max-h-[120vh] max-w-[100vw] min-w-[1200px] w-[150%] h-auto"
              style={{
                opacity: 1,
                transform: (() => {
                  const w = window.innerWidth;
                  if (w < 768) {
                    return phase === 'loading1'
                      ? 'translateX(0%) translateY(0%) scale(0.8)'
                      : 'translateX(0%) translateY(0%) scale(0.8)';
                  } else {
                    return phase === 'loading1'
                      ? 'translateX(0%) translateY(0%) scale(1)'
                      : 'translateX(0%) translateY(0%) scale(1)';
                  }
                })(),
                transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1)'
              }}
            />
          </div>
        )}

        {/* Phase 2: GIF2 animates from center to background position, and stays under GIF3 for 1s after content loads */}
        {(phase === 'loading2' || showGif2) && (
          <div
            className={
              // Always use the same container as GIF1 for transition
              "absolute md:top-[10%] top-[5%] md:bottom-0 bottom-auto md:left-auto left-1/2 md:transform-none transform -translate-x-1/2 md:w-full w-auto md:right-[-10%] right-auto z-10 flex justify-center md:justify-start items-center md:pl-8 pointer-events-none"
            }
          >
            <img
              src={loadingGif2}
              alt="Transition"
              className="object-contain transition-all duration-[2200ms]"
              style={{
                maxHeight: '120vh',
                maxWidth: '100vw',
                minWidth: '1200px',
                width: '150%',
                height: 'auto',
                opacity: 1,
                // Start from exactly where GIF1 ends: perfectly centered and scaled
                transform:
                  gif2FadeIn
                    ? (() => {
                        const w = window.innerWidth;
                        if (w < 768) {
                          return 'translateX(2%) translateY(5%) scale(1)';
                        } else if (w >= 768 && w < 1000) {
                          const percent = ((w - 3500) / (1500)) * 9;
                          const scale = 1.08 + ((w - 768) / (1600 - 800)) * (1.2 - 1);
                          return `translateX(${percent}%) translateY(2.2%) scale(${scale})`;
                        } else if (w >= 1000 && w < 1400) {
                          const percent = ((w - 1200) / (1600)) * 4;
                          const scale = 1.08 + ((w - 768) / (1600 - 800)) * (1.2 - 1);
                          return `translateX(${percent}%) translateY(2.2%) scale(${scale})`;
                        } else {
                          return 'translateX(7%) translateY(3%) scale(1.3)';
                      }
                    })()
                    : (() => {
                        const w = window.innerWidth;
                        if (w < 768) {
                          return 'translateX(0%) translateY(-10.8%) scale(0.8)';
                        }
                        else if (w >= 768 && w < 1000) {
                          return 'translateX(-22%) translateY(-4%) scale(1)';
                        }
                        return 'translate(-11.5%, -4%) scale(1)';
                      })(),
                transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1)'
              }}
            />
          </div>
        )}

        {/* Phase 3: GIF3 in final background position */}
        {phase === 'content' && (
          <div className="absolute md:top-[10%] top-[5%] md:bottom-0 bottom-auto md:left-auto left-1/2 md:transform-none transform -translate-x-1/2 md:w-full w-auto md:right-[-10%] right-auto z-10 flex justify-center md:justify-start items-center md:pl-8">
            <img
              src={loadingGif3}
              alt="E-Cell Animation"
              className="object-contain transition-all duration-700"
              style={{
                maxHeight: '120vh',
                maxWidth: '100vw',
                minWidth: '1200px',
                width: '150%',
                height: 'auto',
                opacity: 1,
                // Responsive transform: translateX is a gradual percentage based on screen width
                transform: (() => {
                  const w = window.innerWidth;
                  if (w < 768) {
                    // mobile: keep as is (go off screen)
                    return 'translateX(2%) translateY(5%) scale(1)';
                  } else if (w >= 768 && w < 1000) {
                    const percent = ((w - 3500) / (1500)) * 9;
                    const scale = 1.08 + ((w - 768) / (1600 - 800)) * (1.2 - 1);
                    return `translateX(${percent}%) translateY(2.2%) scale(${scale})`;
                  } else if (w >= 1000 && w < 1400) {
                    const percent = ((w - 1200) / (1600)) * 4;
                    const scale = 1.08 + ((w - 768) / (1600 - 800)) * (1.2 - 1);
                    return `translateX(${percent}%) translateY(2.2%) scale(${scale})`;
                  } else {
                    // desktop: original
                    return 'translateX(7%) translateY(3%) scale(1.3)';
                  }
                })(),
                transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)'
              }}
            />
          </div>
        )}

        {/* Main Content - Fades in at the end of the animation */}
        <div
          className={`relative z-30 w-full pt-[17vh] pl-4 md:px-8 lg:px-16 transition-opacity duration-1000 flex items-start md:items-center justify-start md:justify-start min-h-screen mt-8 md:mt-0 ${
            phase === 'content' ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="relative max-w-5xl text-left"
          >
            <h1 className="mb-8 md:mb-16">
              <div className="text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1] mb-2 md:mb-2">
                Empowering
              </div>
              <div className="text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1] mb-2 md:mb-2">
                the Next Generation
              </div>
              <div className="text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1]">
                <span className="flex items-center gap-2">
                  of <span className="inline-block">&nbsp;</span><RotatingText
                    texts={['Entrepreneurs', 'Innovaters', 'Founders', 'Leaders']}
                    mainClassName="inline-flex items-center px-2 sm:px-2 md:px-3 bg-[#38bdf8] text-black overflow-hidden py-0.5 sm:py-1 rounded-lg transition-all duration-500 align-middle"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.020}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </span>
              </div>
            </h1>
            <div className="mb-8 md:mb-12">
              <p className="text-sm md:text-base lg:text-xl xl:text-xl text-gray-300 leading-relaxed mb-1 md:mb-2">
                Fueling ideas. Building leaders.
              </p>
              <p className="text-sm md:text-base lg:text-xl xl:text-xl text-gray-300 leading-relaxed">
                Driving innovation from campus to the world.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="mb-6 md:mb-10">
                <button
                  className={
                    [
                      "px-5 py-2 sm:px-8 sm:py-3 rounded-md text-sm font-bold transition duration-200 inline-block text-center cursor-pointer",
                      "bg-white border-2 border-white text-black hover:scale-105",
                      "mb-6"
                    ].join(' ')
                  }
                  style={{ boxShadow: '0 4px 24px black' }}
                  onClick={() => navigate("/aboutus")}
                >
                  Explore More
                </button>
              </div>
              <div className="mb-6 md:mb-10">
                <button
                  className={
                    [
                      "px-5 py-2 sm:px-8 sm:py-3 rounded-md text-sm font-bold transition duration-200 inline-block text-center cursor-pointer",
                      "bg-none hover:bg-[#38bdf8] border-2 border-[#38bdf8] text-white hover:scale-105",
                      "mb-6"
                    ].join(' ')
                  }
                  style={{ boxShadow: '0 4px 24px black' }}
                  onClick={() => navigate("/events")}
                >
                  Our Intiatives
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;