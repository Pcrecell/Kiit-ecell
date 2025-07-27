
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { esummit_pastspeakers } from "../../assets/Image Links";
import "./pastSpeakers.css";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};


const PastSpeakers = () => {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const poppinsBold = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
  };

  const initialSpeakers = [
    {
      name: "Shashi Tharoor",
      title: "Member of Parliament",
      company: "Indian National Congress",
      image: esummit_pastspeakers.pastspeaker_1.link,
      alt: esummit_pastspeakers.pastspeaker_1.alt,
    },
    {
      name: "Akshay Gurnani",
      title: "Co-Founder & Former CEO",
      company: "Schbang",
      image: esummit_pastspeakers.pastspeaker_2.link,
      alt: esummit_pastspeakers.pastspeaker_2.alt,
    },
    {
      name: "Trishneet Arora",
      title: "Founder & CEO",
      company: "Tac Security",
      image: esummit_pastspeakers.pastspeaker_7.link,
      alt: esummit_pastspeakers.pastspeaker_7.alt,
    },
    {
      name: "Prabhu Chawla",
      title: "Editorial Director",
      company: "The New Indian Express",
      image: esummit_pastspeakers.pastspeaker_3.link,
      alt: esummit_pastspeakers.pastspeaker_3.alt,
    },
  ];

  const additionalSpeakers = [
    {
      name: "A Murganantham",
      title: "Real-Life Padman",
      company: "Jayaashree Industries",
      image: esummit_pastspeakers.pastspeaker_6.link,
      alt: esummit_pastspeakers.pastspeaker_6.alt,
    },
    {
      name: "Dan Ram",
      title: "Speaker",
      company: "Ted X",
      image: esummit_pastspeakers.pastspeaker_5.link,
      alt: esummit_pastspeakers.pastspeaker_5.alt,
    },
    {
      name: "Anil Gupta",
      title: "Scholar",
      company: "Honey Bee Network",
      image: esummit_pastspeakers.pastspeaker_4.link,
      alt: esummit_pastspeakers.pastspeaker_4.alt,
    },
  ];

  const allSpeakers = [...initialSpeakers, ...additionalSpeakers];
  const displayedSpeakers = showAll ? allSpeakers : initialSpeakers;

  return (
    <div className="past-speakers-container">
      <div className="header">
        <h1 className="page-title" style={poppinsBold}>Past Speakers</h1>
        <p className="subtitle"  style={poppinsBold}>
          <span>Meet the industry leaders</span> <br />
          <span>that are shaping the future.</span>
        </p>
      </div>

      <div className="speakers-grid">
        {displayedSpeakers.map((speaker, index) => (
          <div key={index} className="speaker-group">
            <div className="speaker-image-card">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="speaker-image"
              />
              {isMobile && (
                <div className="speaker-info-overlay">
                  <h2 className="speaker-name">{speaker.name}</h2>
                  <p className="speaker-title">{speaker.title}</p>
                  <p className="speaker-company">{speaker.company}</p>
                </div>
              )}
            </div>

            {/* Info Card: only render on non-mobile */}
            {!isMobile && (
              <div className="speaker-info-card">
                <div className="speaker-info-content">
                  <h2 className="speaker-name">{speaker.name}</h2>
                  <p className="speaker-title">
                    {speaker.title},{" "}
                    <span className="speaker-company">{speaker.company}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-35 flex justify-center md:justify-end">
        <button
          className="bg-black text-white border border-gray-300 px-10 my-20 py-2 text-base rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-600 hover:-translate-y-0.5 flex items-center"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Less" : "More"}
          <ArrowUpRight
            className={`ml-2 w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-45" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PastSpeakers;