import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStackItem";

const ThemeHeroSection = () => {
  return (
    <section
      className="relative w-full bg-black bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-4 pb-0 overflow-x-hidden"
      style={{
        backgroundImage: `url("https://i.ibb.co/20Sy0hB4/df7214fa61f06511938e22be98bf9d1bc55f4109-1.png")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0" />

      {/* Content Container */}
      <div className="relative w-full flex flex-col items-center justify-center pt-20 pb-0 z-10">
        {/* Title */}
        <h1
          className="text-[40px] sm:text-[56px] md:text-[64px] font-bold leading-tight mb-1"
          style={{
            fontFamily: "Judson, serif",
            background: "linear-gradient(90deg, #d4af37, #fff8dc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          E-Summit:
        </h1>

        {/* Subtitle */}
        <h2
          className="text-[18px] sm:text-[22px] md:text-[28px] font-bold leading-snug mb-8"
          style={{
            fontFamily: "Judson, serif",
            background: "linear-gradient(90deg, #418C73, #FFFFFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Emerald Empires Building Lasting Legacies
        </h2>

        {/* Medusa Image */}
        <img
          src="https://ik.imagekit.io/admr8uj75/face%201.png?updatedAt=1753194334811"
          alt="Medusa"
          className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] object-contain z-20 mb-8"
        />

        {/* Timeline Headings and Descriptions Overlapping History Image - EXACT ORIGINAL POSITIONING */}
        <div
          className="absolute left-0 top-1/2 w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 px-2 md:px-8 lg:px-16"
          style={{
            zIndex: 50,
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          {/* Emerald Empire */}
          <div
            className="flex-1 flex flex-col items-center"
            style={{ position: "relative", top: "-100px", left: "-100px" }}
          >
            <h3
              className="text-[20px] sm:text-[28px] md:text-[32px] font-bold mb-2 text-center"
              style={{ color: "#EDBD90" }}
            >
              2025
              <br />
              Emerald Empire
            </h3>
            <p
              className="text-[14px] sm:text-base md:text-lg max-w-xs text-center"
              style={{ color: "#15A944" }}
            >
              Emerald holds the crown, leading with wisdom and vision as the
              legacy begins.
            </p>
          </div>
          {/* Ruby Empire */}
          <div
            className="flex-1 text-center"
            style={{ position: "relative", top: "-350px" }}
          >
            <h3
              className="text-[20px] sm:text-[28px] md:text-[32px] font-bold mb-2"
              style={{ color: "#EDBD90" }}
            >
              2026
              <br />
              Ruby Empire
            </h3>
            <p
              className="text-[14px] sm:text-base md:text-lg max-w-xs mx-auto"
              style={{ color: "#FF375B" }}
            >
              The crown passes to Ruby—bold, fiery, and ready to spark a new era
              of innovation.
            </p>
          </div>
          {/* Sapphire Empire */}
          <div
            className="flex-1 flex flex-col items-center"
            style={{ position: "relative", top: "10px", right: "-100px" }}
          >
            <h3
              className="text-[20px] sm:text-[28px] md:text-[32px] font-bold mb-2 text-center"
              style={{ color: "#EDBD90" }}
            >
              2027
              <br />
              Sapphire Empire
            </h3>
            <p
              className="text-[14px] sm:text-base md:text-lg max-w-xs text-center"
              style={{ color: "#5EBFE6" }}
            >
              Sapphire takes the throne, where calm strategy and sharp minds
              shape the future.
            </p>
          </div>
        </div>

        {/* History Image */}
        <img
          src="https://ik.imagekit.io/admr8uj75/transparent%205.png?updatedAt=1753471446647"
          alt="History"
          className="w-screen max-w-none h-auto object-cover z-10 mb-8"
          style={{
            position: "relative",
            left: "50%",
            right: "50%",
            transform: "translateX(-50%)",
            minWidth: "100vw",
          }}
        />
        {/* Stone Images Container with ScrollStackItem animation, each image fully visible before next overlays */}
        <div className="sticky top-0 w-[300px] sm:w-[600px] md:w-[900px] lg:w-[1100px] h-[400px] sm:h-[700px] mb-0">
          <ScrollStack>
            <ScrollStackItem isFirst={true}>
              <img
                src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20270%20(1).png?updatedAt=1753470791607"
                alt="stone 1"
                className="absolute inset-0 w-full h-full object-contain z-10"
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </ScrollStackItem>
            <ScrollStackItem>
              <img
                src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20271%20(1).png?updatedAt=1753470791633"
                alt="stone 2"
                className="absolute inset-0 w-full h-full object-contain z-20"
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </ScrollStackItem>
            <ScrollStackItem>
              <img
                src="https://ik.imagekit.io/admr8uj75/Property%201=Frame%20272%20(1).png?updatedAt=1753470791626"
                alt="stone 3"
                className="absolute inset-0 w-full h-full object-contain z-30"
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </ScrollStackItem>
          </ScrollStack>
        </div>
        {/* Register Now Button */}
        <div className="w-full flex justify-center mt-16 sm:mt-28 mb-12">
          <a
            href="#register" // Change this to your registration link or section
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border-4 font-bold text-base sm:text-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            style={{
              fontFamily: "Judson, serif",
              background: "#145F58",
              color: "#FFFFFF",
              borderColor: "#B1B194",
            }}
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThemeHeroSection;
