import React from "react";
import KiteBackground from "./KiteBackground"
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";



const FacultyMembers = () => {
  const groupedData = [
    {
      category: "Planning &\nManagement",
      members: [
        {
          name: "Prof. Priyadarshi Biswal",
          role: "Planning & Management",
          image: "https://ik.imagekit.io/d73k0qzwc/biswal.jpg",
        },
        {
          name: "Prof. Prachet Bhuyan",
          role: "Planning & Management",
          image: "https://ik.imagekit.io/d73k0qzwc/Prachet-Bhuyan.jpg",
        },
        {
          name: "Prof. Abhisek Ray",
          role: "Planning & Management",
          image: "https://ik.imagekit.io/d73k0qzwc/Abhishek-Ray.jpg",
        },
        {
          name: "Prof. Srinibash Pattanaik",
          role: "Planning & Management",
          image: "https://ik.imagekit.io/d73k0qzwc/srinivas-patnaik-passport.jpg",
        },
      ],
    },
    {
      category: "Corporate\nLiaisoning",
      members: [
        {
          name: "Mr. Navendu Kar",
          role: "Corporate Liaisoning",
          image: "https://ik.imagekit.io/d73k0qzwc/images.png",
        },
        {
          name: "Mr. Mrityunjay Ray",
          role: "Corporate Liaisoning",
          image: "https://ik.imagekit.io/d73k0qzwc/images.png",
        },
        {
          name: "Mr. Manish Verma",
          role: "Corporate Liaisoning",
          image: "https://ik.imagekit.io/qxzia1tvt/Manish.png",
        },
        {
          name: "Mr. Debraj Mitra",
          role: "Corporate Liaisoning",
          image: "https://ik.imagekit.io/d73k0qzwc/debraj.jpg",
        },
      ],
    },
    {
      category: "Branding,\nAdvertising &\nSponsorship",
      members: [
        {
          name: "Prof. Sugatu Tripathy",
          role: "Branding & Sponsorship",
          image: "https://ik.imagekit.io/d73k0qzwc/1574845997807.jpg",
        },
        {
          name: "Prof. Joydeep Biswas",
          role: "Branding & Sponsorship",
          image: "https://ik.imagekit.io/d73k0qzwc/Joydeep-Biswas-faculty-KSOM.jpg",
        },
        {
          name: "Prof. Ratish Nair",
          role: "Branding & Sponsorship",
          image: "https://ik.imagekit.io/d73k0qzwc/ksod-Ratheesh-jpg.webp",
        },
        {
          name: "Prof. Aridam Basak",
          role: "Branding & Sponsorship",
          image: "https://ik.imagekit.io/d73k0qzwc/pic-arindam-basak-600x751.jpg",
        },
      ],
    },
    {
      category: "Finance\n& Account\nManagement",
      members: [
        {
          name: "Prof. Suraj Tripathy",
          role: "Finance & Account Management",
          image: "https://ik.imagekit.io/d73k0qzwc/SurajKTripathy.jpg",
        },
        {
          name: "Prof. Sudipta Desarkar",
          role: "Finance & Account Management",
          image: "https://ik.imagekit.io/d73k0qzwc/sudipta-desarkar.jpg",
        },
        {
          name: "Prof. Pinaki P Pattanaik",
          role: "Finance & Account Management",
          image: "https://ik.imagekit.io/d73k0qzwc/pinaki.jpg",
        },
      ],
    },
    {
      category: "Hospitality &\nTravel",
      members: [
        {
          name: "Prof. Kumar Devdatta",
          role: "Hospitality & Travel",
          image: "https://ik.imagekit.io/d73k0qzwc/Kumar-Devdutta.jpg",
        },
        {
          name: "Prof. Ajit Kumar Pasawat",
          role: "Hospitality & Travel",
          image: "https://ik.imagekit.io/d73k0qzwc/Ajit-Kumar-Pasayat.jpg",
        },
      ],
    },
  ];

  return (
    <KiteBackground>
      <div
        className="pt-12 px-12 text-white flex bg-none flex-col items-center pb-16 z-20"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-12 font-['Poppins']">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B7FF] via-[#47edff] to-[#dcf7fa]">
            TASKFORCE
          </span>
        </h2>

        <div className="w-full max-w-7xl mx-auto space-y-10">
          {groupedData.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row border border-white rounded-xl overflow-hidden min-h-[335px] 
                ${index === 3
                  ? "w-[95%] sm:w-[85%] md:w-max mx-auto"
                  : index === 4
                    ? "w-full sm:w-[70%] md:w-max mx-auto"
                    : "w-full"
                }
              `}
            >
              {/* Category card */}
              <div
                className="bg-gradient-to-b from-[#007bb5] to-[#00bcd4] text-white flex items-center justify-center text-center
                  px-2 sm:px-4 py-3 sm:py-6 whitespace-pre-line
                  font-semibold text-sm sm:text-lg md:text-xl min-h-[60px] sm:min-h-[180px] md:min-h-[180px]
                  w-full sm:w-[220px] md:w-[200px]"
              >
                <div className="flex flex-col items-center justify-center w-full relative">
                  <span className="whitespace-pre-line">{section.category}</span>
                  <div className="flex sm:hidden items-center gap-1 absolute bottom-2 right-2 animate-pulse text-xs text-white">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div className="flex sm:hidden items-center gap-1 absolute bottom-2 left-2 animate-pulse text-xs text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </div>

                </div>

              </div>

              {/* Faculty cards container */}
              <div className="flex overflow-x-hidden mt-4 w-full px-2 sm:px-4 md:px-6">
                {section.members.map((member, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 md:p-4 flex-shrink-0"
                  >
                    <div className="border border-white rounded-bl-[14.21px] rounded-br-[14.21px] overflow-hidden w-[140px] sm:w-[180px] md:w-[220px] xl:w-[250px]">
                      <FacultyCard member={member} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </KiteBackground>
  );
};

function FacultyCard({ member }) {
  return (
    <div className="flex flex-col h-auto">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover border-b border-white"
      />
      <div className="bg-white text-black text-center py-1 sm:py-2 px-1 sm:px-2 w-full rounded-bl-[14.21px] rounded-br-[14.21px] flex-1">
        <p className="font-semibold text-[10px] sm:text-xs md:text-sm leading-tight">
          {member.name}
        </p>
        <p className="text-[9px] sm:text-xs md:text-sm leading-tight">
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default FacultyMembers;
