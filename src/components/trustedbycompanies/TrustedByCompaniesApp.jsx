import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Trustedbycompanies from "./TrustedbycompaniesModule";
import Carousel from "./Carousel";
import { trusted_by_companies } from "../../assets/Image Links";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { link: trusted_by_companies.company_1.link, alt: trusted_by_companies.company_1.alt },
  { link: trusted_by_companies.company_2.link, alt: trusted_by_companies.company_2.alt },
  { link: trusted_by_companies.company_3.link, alt: trusted_by_companies.company_3.alt },
  { link: trusted_by_companies.company_4.link, alt: trusted_by_companies.company_4.alt },
  { link: trusted_by_companies.company_5.link, alt: trusted_by_companies.company_5.alt },
  { link: trusted_by_companies.company_6.link, alt: trusted_by_companies.company_6.alt },
  { link: trusted_by_companies.company_7.link, alt: trusted_by_companies.company_7.alt },
  { link: trusted_by_companies.company_8.link, alt: trusted_by_companies.company_8.alt },
  { link: trusted_by_companies.company_9.link, alt: trusted_by_companies.company_9.alt },
  { link: trusted_by_companies.company_10.link, alt: trusted_by_companies.company_10.alt },
  { link: trusted_by_companies.company_11.link, alt: trusted_by_companies.company_11.alt },
  { link: trusted_by_companies.company_12.link, alt: trusted_by_companies.company_12.alt },
  { link: trusted_by_companies.company_13.link, alt: trusted_by_companies.company_13.alt },
  { link: trusted_by_companies.company_14.link, alt: trusted_by_companies.company_14.alt },
  
];

const TrustedByCompaniesApp = () => {
  const containerRef = useRef(null);
  const [startCarousel, setStartCarousel] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%", // trigger when top of element hits 80% of viewport
      onEnter: () => setStartCarousel(true),
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[70vh] flex flex-col sm:flex-row items-center justify-center gap-8 px-4 sm:px-10 bg-black"
    >
      <div className="w-full sm:w-[55%] flex justify-center">
        <Trustedbycompanies logo={trusted_by_companies.text.link} />
      </div>

      <div className="w-full sm:w-[35%] flex justify-center overflow-hidden">
        <Carousel
          images={images}
          displayTime={1200}
          transitionTime={300}
          rewindSpeed={70}
          shouldAnimate={startCarousel}
        />
      </div>
    </div>
  );
};

export default TrustedByCompaniesApp;
