import React from "react";

const timelineItems = [
  {
    session: 1,
    title:
      "Why BuildSchool? Ideation, Founder-Market Fit & Finding Your Co-Founder.",
    description:
      "Kick off your BuildSchool journey by aligning passion with real market needs. Discover how structured learning, relentless networking, and personal growth set the stage for your founder success.",
    highlight: true,
  },
  {
    session: 2,
    title: "Building in Public – Leveraging Transparency for Growth.",
    description:
      "Embrace radical openness to win over early adopters and build a loyal following. From content-led marketing to personal brand building, learn to turn transparency into traction.",
    highlight: false,
  },
  {
    session: 3,
    title:
      "Business Models, Market Research & Problem-Solving Through System/Design Thinking.",
    description:
      "Master the art of identifying viable markets and crafting disruptive business models. Dive deep into problem-solving frameworks that turn bold ideas into profitable realities.",
    highlight: true,
  },
  {
    session: 4,
    title: "Building Your First Product.",
    description:
      "Kick off your BuildSchool journey by aligning passion with real market needs. Discover how structured learning, relentless networking, and personal growth set the stage for your founder success.",
    highlight: false,
  },
  {
    session: 5,
    title: "Building Your MVP - No-Code & AI Tools for Rapid Prototyping.",
    description:
      "Launch faster than ever by tapping into the power of no-code and AI automation. Transform raw ideas into functional prototypes without writing a single line of code.",
    highlight: true,
  },
  {
    session: 6,
    title: "Tech 101 - System Design, Cloud Infrastructure, Automation & Security.",
    description:
      "Lay the technical foundation your startup deserves. From choosing the right cloud stack to automating deployments, learn the essentials of building a secure, scalable product.",
    highlight: false,
  },
  {
    session: 7,
    title: "Design 101 for Founders - Understanding the Importance of UI/UX.",
    description:
      "Elevate user experiences through thoughtful design. Discover why aesthetics, usability, and empathy can make or break your product's adoption and retention.",
    highlight: true,
  },
  {
    session: 8,
    title: "Marketing 101 & GTM.",
    description:
      "Turn your product into a movement with sharp marketing tactics. Learn how to build early buzz, secure your first thousand users, and set the stage for sustainable growth.",
    highlight: false,
  },
  {
    session: 9,
    title: "Mastering the Pitch - How to Sell Your Startup to Investors & Customers.",
    description:
      "Nail your story and capture attention, whether you're facing VCs, angel investors, or prospective customers. Perfect your deck and Q&A to stand out in crowded markets.",
    highlight: true,
  },
  {
    session: "DEMO DAY !",
    title: "DEMO DAY !",
    description:
      "Step into the spotlight and showcase what you've built. Impress investors, industry leaders, and peers, and open doors to mentorship, funding, and real-world impact.",
    highlight: false,
  },
];

function Session() {
  return (
    <div className="min-h-screen bg-[#050527] text-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-blue-500/20 md:left-1/2 md:-translate-x-1/2"></div>

        {/* Timeline items */}
        <div className="flex flex-col gap-8 md:gap-16">
          {timelineItems.map((item, index) => {
            const isLast = index === timelineItems.length - 1;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex ${
                  isLast
                    ? "justify-center"
                    : `md:justify-${isEven ? "start" : "end"}`
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-7 left-4 md:left-1/2 md:-translate-x-1/2 w-[14px] h-[14px] rounded-full z-10 ${
                    item.highlight
                      ? "bg-yellow-300 shadow-yellow-300 shadow-lg"
                      : "bg-blue-400 shadow-blue-400 shadow-lg"
                  } ${isLast ? "md:top-[-2rem]" : ""}`}
                ></div>

                {/* Card */}
                <div
                  className={`w-[calc(100%-2rem)] bg-slate-800/40 border border-slate-600/50 backdrop-blur-md rounded-lg p-6 ml-8 md:w-[calc(50%-5rem)] md:ml-8 md:mr-8 ${
                    isLast ? "w-full md:w-2/3 lg:w-1/2 text-center" : isEven ? "md:ml-20" : "md:mr-20"
                  }`}
                >
                  <div className="flex flex-wrap gap-2 items-baseline mb-2">
                    {typeof item.session === "number" && !isLast && (
                      <span className="text-white font-thin whitespace-nowrap">
                        Session {item.session} :
                      </span>
                    )}
                    <h3 className="text-blue-400 font-medium">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Session;
