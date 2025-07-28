import React from "react";

// AboutUsTopSection: Full-screen scrollable sections for KIIT, KISS, and Founder
const AboutUsTopSection = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a1623] text-white overflow-x-hidden">
      {/* KIIT Section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black relative pt-4 md:pt-40 sm:pt-8 md:pt-16 px-2 sm:px-4 md:px-8">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            padding: "1rem",
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={require("../../assets/about-us-kiit-bg.jpg")}
            alt="KIIT Background"
            className="w-full max-w-full object-cover md:p-4 rounded-xl sm:rounded-2xl opacity-60 md:h-[90%] gradient-to-b from-black via-gray-900 to-black"
            style={{
              boxSizing: "border-box",
              height: "calc(100% - 40px)", // decrease height from bottom by 40px
              WebkitMaskImage:
                 "linear-gradient(to bottom, transparent 0%, black 40%, black 80%, transparent 100%)",
                
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskComposite: "destination-in",
              maskComposite: "intersect",
              filter: "grayscale(50%)",
            }}
          />
        </div>
        <div className="max-w-8xl w-full text-center mb-2 absolute left-1/2 -translate-x-1/2 top-[15%] z-30 px-2 sm:px-0">
          <h2
            className="text-[15px] font-bold sm:text-xs md:text-3xl mb-0 sm:mb-4 tracking-wide text-white drop-shadow-lg px-0 sm:px-2 whitespace-normal break-words"
            style={{
              top: "0rem",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
            }}
          >
            A Hub of Excellence: Converging Education, Research, and Innovation
            to Shape the Future.
          </h2>
        </div>
        <div className="relative max-w-2xl w-full flex flex-col items-center mt-0 md:mt-16">
          <div
            className="absolute top-0 left-0 z-50 w-10 h-10 md:w-auto md:h-auto flex items-center justify-center"
            style={{ padding: 0, margin: 0 }}
          >
            <span className="text-5xl md:text-9xl text-white font-bold font-transcity block w-full h-full">
              “
            </span>
          </div>
          <div
            className="w-full rounded-xl min-h-[120px] sm:min-h-[180px] md:min-h-[260px] md:max-w-3xl md:translate-y-1.2 sm:max-w-4xl p-4 sm:p-8 pt-10 sm:pt-16 text-center relative z-20"
            style={{
              background: "linear-gradient(180deg, #1E1E1E 0%, #313131 100%)",
            }}
          >
            <h1 className="text-5xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-wide">
              KIIT
            </h1>
            <p className="text-xs sm:text-lg md:text-2xl leading-relaxed px-2 sm:px-0">
              Kalinga Institute of Industrial Technology (KIIT), a household
              name in the education sector, has become a sought-after
              destination in India for professional studies. It is admired all
              over for the quality of its academic courses, its community
              outreach work and as a university of compassion and
              humanitarianism. It has become a case study because no other
              educational institution in India has grown in its scope and scale
              as much as KIIT has in a short span of 25 years. Its incredible
              transformation is truly a journey from Soil to Silver.
            </p>
          </div>
        </div>
      </section>

      {/* KISS Section - EXACT MATCH TO IMAGE */}
      <section className="w-full min-h-screen flex flex-col justify-center pr-4 pl-0 sm:px-4 md:pl-0 md:pr-8 py-0 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="w-full flex flex-col justify-center items-start min-h-screen relative">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16">
            <h1 className="text-white text-m pt-0 md:pt-20 md:text-2xl font-bold text-center md:text-left">
              World's largest Educational Institution for Indigenous Children
              and Youth
            </h1>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16">
            <h1 className="text-white font-roboto tracking-wider text-4xl md:text-7xl md:pt-1 pb-7 md:pb-10 font-bold text-center md:text-left">
              KISS
            </h1>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-start w-full gap-2 "
            style={{ minHeight: "180px" }}
          >
            <div
              className="flex flex-col justify-center items-start w-full sm:w-[60%] min-h-[100px] sm:min-h-[180px] md:min-h-[500px] rounded-tr-[12px] sm:rounded-tr-[32px] rounded-br-[12px] sm:rounded-br-[32px] overflow-hidden shadow-lg sm:ml-0 order-2 sm:order-1"
              style={{
                background:
                  "linear-gradient(90deg, #04192dff 0%, #1a78aeff 100%)",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderTopRightRadius: "32px",
                borderBottomRightRadius: "32px",
                alignSelf: "flex-start",
                marginLeft: 0,
              }}
            >
              <div className="w-full h-full flex flex-col justify-center px-2 sm:px-8 py-2 sm:py-7">
                <p
                  className="text-xs font-roboto sm:text-base md:tracking-wide md:text-2xl md:leading-normal text-white font-normal px-1 sm:px-0"
                  style={{ lineHeight: "1.3", marginTop: "0" }}
                >
                  KISS is a fully free residential home for 80,000 students in
                  Special Consultative Status with the United Nations Economic
                  and Social Council (ECOSOC) since the year 2015. <br /> <br />{" "}
                  It is registered under Societies Act XXI of 1860. Its higher
                  education unit, KISS Deemed to be University has been declared
                  Deemed to be University under Section 3 of UGC Act, 1956 by
                  the Ministry of Human resource development, Government of
                  India, New Delhi since 2017. <br /> KISS has been conferred
                  UNESCO King Sejong Literacy Prize 2022 for its contribution to
                  preservation of indigenous languages.
                </p>
              </div>
            </div>
            <div
              className="w-full sm:w-[40%] flex items-center justify-center mb-2 sm:mb-0 order-1 sm:order-2 mx-auto"
              style={{ zIndex: 2, justifyContent: "start" }}
            >
              <img
                src={require("../../assets/Images/png/about-us-kiss-bg.png")}
                alt="KISS Building"
                className="w-[90%] h-auto max-h-72 sm:max-h-64 md:max-h-96 object-contain"
                style={{ marginRight: "0rem" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center pr-0 pl-2 sm:px-4 md:pr-0 md:pl-5 py-8 sm:py-12 bg-gradient-to-b from-black via-gray-900 to-black md:pt-[10%]">
        <div className="max-w-7xl w-full mb-4 sm:mb-8">
          <h2 className="text-xl text-center md:text-right sm:text-2xl md:text-7xl font-bold mb-4 tracking-wide md:pr-8 lg:pr-16">
            OUR HON'BLE FOUNDER SIR
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 w-full">
          <div className="w-full sm:w-[40%] flex justify-end mb-2 sm:mb-0 pr-0 sm:pr-8 flex-col items-end">
            <img
              src={require("../../assets/Images/png/about-us-founder-bg.png")}
              alt="Founder Speech"
              className="w-[90%] translate-x-2 max-w-full h-auto max-h-72 sm:max-h-64 md:max-h-96 object-contain"
            />
            <div
              className="w-full sm:w-auto mt-2 sm:mt-4 text-center"
              style={{ maxWidth: "90%" }}
            >
              <div className="text-right md:pr-10">
                <p
                  className="text-[10px] pr-2 md:pr-0 sm:text-base md:text-m lg:m text-white font-normal leading-snug"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  “I struggled for my food for the first 25 years of my life and
                  now, my struggle is to provide food to millions.”
                </p>
                <p
                  className="text-[10px] pr-2 md:pr-0 sm:text-base md:text-m lg:text-xl font-normal mt-1"
                  style={{
                    color: "#1a78ae",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  -Achyuta Samanta
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-center items-start w-full sm:w-[60%] min-h-[120px] sm:min-h-[180px] md:min-h-[500px] rounded-tl-[16px] sm:rounded-tl-[32px] rounded-bl-[16px] sm:rounded-bl-[32px] rounded-tr-none rounded-br-none overflow-hidden shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, #1a78aeff 0%,  #001424ff 100%)",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderTopLeftRadius: "32px",
              borderBottomLeftRadius: "32px",
              alignSelf: "stretch",
              marginRight: 0,
              marginLeft: "auto",
            }}
          >
            <div className="w-full h-full flex flex-col justify-center pl-1 sm:pl-8 pr-0 py-7 sm:py-7">
              <p
                className="text-xs font-roboto sm:text-base md:text-2xl md:tracking-wide leading-normal text-white font-normal px-4 sm:px-0"
                style={{ lineHeight: "1.2", marginTop: "0" }}
              >
                Prof. Achyuta Samanta is an educationist, humanitarian and a
                statesman. He grew up in Kalarabanka, Odisha amidst severe
                poverty with seven siblings and a widow mother. He managed to
                complete his Masters, struggling and braving the hardships from
                the age of four when he lost his father in a train accident.
                <br />
                He founded a polytechnic institution while he was working as a
                Chemistry Lecturer in 1992 with $100, iron will and strong
                passion. The small industry training institution grew into a
                University in 2004, known by its acronym, KIIT, Kalinga
                Institute of Industrial Technology. In the same year, he also
                founded Kalinga Institute of Social Sciences (KISS) for
                providing education to the indigenous boys and girls, free of
                cost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsTopSection;
