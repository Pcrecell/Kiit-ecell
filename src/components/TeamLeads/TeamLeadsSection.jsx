import React, { useEffect, useState, useRef } from "react";
import ProfileCard from "./LiasonCard";
import InactiveCard from "./InactiveCard";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./cardTransition.css";
import { liaison_officers } from "../../assets/Image Links";



const TeamLeadsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Start with first card active

  const domains = [
    { name: "Tech", teamLeadName: "Ayush Kshitij",title : "Liaison Officer, Tech", profilePic: liaison_officers.ayush_kshitij.link },
    { name: "Public & Corporate Relations", teamLeadName: "Anmol Tiwari" ,title : "Liaison Officer, P.C.R", profilePic: liaison_officers.anmol_tiwari.link },
    { name: "Public & Corporate Relations", teamLeadName: "Abhishek Sahoo",title : "Liaison Officer, P.C.R", profilePic: liaison_officers.abhishek_sahoo.link },
    { name: "Research & Development", teamLeadName: "Manshi Jaiswal", title : "Liaison Officer, R&D", profilePic: liaison_officers.manshi_jaiswal.link },
    { name: "Design & Marketing", teamLeadName: "Dhruv Duggal",title : "Liaison Officer, Design & Marketing", profilePic: liaison_officers.dhruv_duggal.link }
    
  ];

  const nodeRefs = useRef(domains.map(() => React.createRef()));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is common for tablets/mobile breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance active card every 5 seconds (only on desktop)
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % domains.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeIndex, isMobile, domains.length]);

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black opacity-50 z-0"></div>

      {/* Animated effect */}
      <div className="absolute top-0 left-0 w-full h-full lg:bg-[length:300%_300%] bg-gradient-to-b from-transparent via-transparent to-black animate-gradient-move z-0"></div>

      {/* Title */}
      <div className="text-white text-center z-20 mt-8 sm:mt-24 mb-16 w-full px-4 md:pt-16"> {/* Added sm:mt-24 here */}
        {/* Responsive title alignment and size */}
        <div className="inline-block leading-none w-full text-center md:text-center">
          <h2 className="font-[Transcity] text-5xl sm:text-8xl -mt-8 ">Liaison Officers</h2>
        </div>
      </div>

      {/* Desktop Cards Layout */}
      {!isMobile && (
        <div className="flex flex-row gap-8 justify-center items-center z-10 mb-16"> 
          {domains.map((domain, index) => {
            const nodeRef = nodeRefs.current[index];
            return (
              <SwitchTransition key={index} mode="out-in">
                <CSSTransition
                  key={activeIndex === index ? "active" : "inactive"}
                  timeout={350}
                  classNames="card-fade"
                  nodeRef={nodeRef}
                >
                  <div
                    ref={nodeRef}
                    style={{ minWidth: 180, display: "flex", justifyContent: "center" }}
                  >
                    {activeIndex === index ? (
                      <ProfileCard
                        avatarUrl={domain.profilePic}
                        name={domain.teamLeadName}
                        title={domain.title}
                        iconUrl={liaison_officers.card_bg.link}
                        onClick={() => setActiveIndex(null)}
                      />
                    ) : (
                      <div style={{ width: "100%" }}>
                        <InactiveCard
                          avatarUrl={domain.profilePic}
                          name={domain.name}
                          onClick={() => setActiveIndex(index)}
                        />
                      </div>
                    )}
                  </div>
                </CSSTransition>
              </SwitchTransition>
            );
          })}
        </div>
      )}

      {/* Mobile Cards Layout */}
      {isMobile && (
        <div className="flex flex-col items-center z-10 mb-16 w-full px-4 gap-2">
          {/* Active Profile Card for Mobile */}
          <div className="mb-8 w-full max-w-xs">
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={activeIndex}
                timeout={350}
                classNames="card-fade"
                nodeRef={nodeRefs.current[activeIndex]}
              >
                <div
                  ref={nodeRefs.current[activeIndex]}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ProfileCard
                    avatarUrl={domains[activeIndex].profilePic}
                    name={domains[activeIndex].teamLeadName}
                    title={domains[activeIndex].title}
                    iconUrl={liaison_officers.card_bg.link}
                    onClick={() => {}}
                  />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>

          {/* Inactive Cards for Mobile */}
          <div className="flex flex-wrap justify-center gap-12 w-full max-w-md">
            {domains.map((domain, index) => {
              if (activeIndex !== index) {
                const nodeRef = nodeRefs.current[index];
                return (
                  <CSSTransition
                    key={index}
                    timeout={350}
                    classNames="card-fade"
                    nodeRef={nodeRef}
                  >
                    <div
                      ref={nodeRef}
                      className="w-20 h-20 flex justify-center items-center rounded-full mt-"
                    >
                      <InactiveCard
                        avatarUrl={domain.profilePic}
                        name={domain.name}
                        onClick={() => setActiveIndex(index)}
                      />
                    </div>
                  </CSSTransition>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeadsSection;