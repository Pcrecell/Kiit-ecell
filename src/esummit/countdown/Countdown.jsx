import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import SemiCircleFrame from "./SemiCircleFrame";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const digitsRef = useRef({
    days: [],
    hours: [],
    minutes: [],
    seconds: [],
  });

  const mobileStyles = `
 .countdown-seconds-mobile {
 position: relative;
 display: inline-block;
 margin-left: 4px;
 color: white;
 font-weight: bold;
 font-family: monospace;
 text-shadow: 0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(34, 197, 94, 0.6);
 }

    @media (max-width: 767px) {
      .countdown-container {
        max-width: 380px !important;
        padding: 8px !important;
      }

      .countdown-inner {
        padding: 16px !important;
        border-radius: 12px !important;
      }

      .countdown-header {
        font-size: 14px !important;
        margin-bottom: 12px !important;
      }

      .countdown-digit-box {
        width: 68px !important;
        height: 68px !important;
        border-radius: 10px !important;
      }

      .countdown-digit-text {
        font-size: 32px !important;
      }

      .countdown-label {
        font-size: 10px !important;
        margin-top: 6px !important;
      }

      .countdown-separator {
        font-size: 24px !important;
        margin-bottom: 12px !important;
      }

      .countdown-seconds-mobile {
        font-size: 18px !important;
        margin-left: 4px !important;
      }

      .countdown-main-container {
        gap: 8px !important;
      }

      .countdown-external-seconds {
        margin-left: 4px !important;
        font-size: 18px !important;
      }
    }

    @media (min-width: 768px) {
      .countdown-seconds-mobile {
        font-size: 20px;
        margin-left: 8px;
      }
    }

    @media (min-width: 1024px) {
      .countdown-seconds-mobile {
        font-size: 24px;
        margin-left: 12px;
      }
    }

    @media (min-width: 1280px) {
      .countdown-seconds-mobile {
        font-size: 28px;
        margin-left: 16px;
      }
    }
  `;

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeLeft(targetDate);
      animateDigitsChange(timeLeft, newTime);
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, targetDate]);

  const animateDigitsChange = (oldTime, newTime) => {
    ["days", "hours", "minutes", "seconds"].forEach((unit) => {
      const oldDigits = String(oldTime[unit]).padStart(2, "0").split("");
      const newDigits = String(newTime[unit]).padStart(2, "0").split("");

      newDigits.forEach((digit, index) => {
        if (digit !== oldDigits[index]) {
          const el = digitsRef.current[unit][index];
          if (el) {
            gsap.fromTo(
              el,
              {
                opacity: 0.3,
                y: -8,
                scale: 0.9,
                color: "#26963D",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                color: "#ffffff",
                duration: 0.4,
                ease: "back.out(1.4)",
              }
            );
          }
        }
      });
    });
  };

  function getTimeLeft(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    let difference = target - now - 1000;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const renderDigits = (value, unit) =>
    String(value)
      .padStart(2, "0")
      .split("")
      .map((digit, index) => (
        <span
          key={index}
          ref={(el) => (digitsRef.current[unit][index] = el)}
          className="inline-block"
        >
          {digit}
        </span>
      ));

  const getDisplayValues = () => {
    if (timeLeft.days > 0) {
      return [
        { value: timeLeft.days, unit: "days", label: "DAYS" },
        { value: timeLeft.hours, unit: "hours", label: "HOURS" },
        { value: timeLeft.minutes, unit: "minutes", label: "MINUTES" },
      ];
    } else if (timeLeft.hours > 0) {
      return [
        { value: timeLeft.hours, unit: "hours", label: "HOURS" },
        { value: timeLeft.minutes, unit: "minutes", label: "MINUTES" },
        { value: timeLeft.seconds, unit: "seconds", label: "SECONDS" },
      ];
    } else {
      return [
        { value: timeLeft.minutes, unit: "minutes", label: "MINUTES" },
        { value: timeLeft.seconds, unit: "seconds", label: "SECONDS" },
        { value: 0, unit: "milliseconds", label: "MS" },
      ];
    }
  };

  const displayValues = getDisplayValues();
  const showExternalSeconds = timeLeft.days > 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
      <div className="min-h-[40vh] sm:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-grey-900">
        <SemiCircleFrame timeLeft={timeLeft} targetDate={targetDate}>
          <div className="countdown-container relative w-full max-w-sm sm:max-w-md md:max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            {/* ⬇ Changed this line ⬇ */}
            <div className="pt-12 sm:pt-14 md:pt-12 lg:pt-16 xl:pt-20 2xl:pt-24 pb-8 sm:pb-10 md:pb-12 lg:pb-16">
              <div className="rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-[1px] sm:p-[1.5px] md:p-[2px] bg-gradient-to-r from-[#174817] via-[#1b491b] to-[#08611d]">
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #080c08ff 0%, #161b16ff 25%, #174817ff 50%, #1b491bff 75%, #08611dff 100%)",
                  }}
                  className="countdown-inner rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-2 sm:p-3 md:p-6 lg:p-8 xl:p-10 backdrop-blur-sm shadow-2xl"
                >
                  <div className="text-center mb-2 sm:mb-3 md:mb-6">
                    <h2 className="countdown-header text-white text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide">
                      Early Bird Pricing Ends In:
                    </h2>
                  </div>

                  <div className="countdown-main-container flex items-center justify-center gap-1 sm:gap-1.5 md:gap-3 lg:gap-4 relative min-h-[80px] sm:min-h-[100px] md:min-h-[200px]">
                    {displayValues.map((item, index) => (
                      <React.Fragment key={item.unit}>
                        <div className="flex flex-col items-center">
                          <div
                            className="countdown-digit-box relative bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center transform-gpu"
                            style={{
                              borderRadius: "3rem",
                              background: "#26963D",
                              boxShadow:
                                "0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              width: "clamp(68px, 18vw, 180px)",
                              height: "clamp(68px, 18vw, 180px)",
                              minWidth: "68px",
                              minHeight: "68px",
                              maxWidth: "180px",
                              maxHeight: "180px",
                            }}
                          >
                            <div
                              className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"
                              style={{ borderRadius: "3rem" }}
                            ></div>
                            <span
                              className="countdown-digit-text relative z-10 text-white font-bold font-mono flex items-center justify-center w-full h-full"
                              style={{
                                textShadow:
                                  "0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(34, 197, 94, 0.6)",
                                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                                lineHeight: "1",
                              }}
                            >
                              {renderDigits(item.value, item.unit)}
                            </span>
                          </div>
                          <span className="countdown-label text-white font-medium tracking-wider mt-0.5 sm:mt-1 md:mt-2 text-[10px] sm:text-[12px] md:text-sm lg:text-base">
                            {item.label}
                          </span>
                        </div>

                        {index < displayValues.length - 1 && (
                          <div
                            className="countdown-separator text-white font-bold mb-1 sm:mb-2 md:mb-4 flex flex-col items-center gap-0
                                           text-lg
                                           sm:text-xl
                                           md:text-3xl
                                           lg:text-4xl
                                           xl:text-5xl
                                           2xl:text-6xl"
                          >
                            <div>•</div>
                            <div>•</div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {showExternalSeconds && (
                      <div className="countdown-seconds-mobile">
                        {renderDigits(timeLeft.seconds, "seconds")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SemiCircleFrame>
      </div>
    </>
  );
};

export default Countdown;
