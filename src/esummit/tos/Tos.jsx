import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import EsummitNavbar from "../Navbar/EsummitNavbar";
import CustomScrollBar from "../CustomScrollBar";

const Tos = () => {
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

  return (
    <div>
      <EsummitNavbar />
      <CustomScrollBar />
    <main className="bg-[#0000] text-gray-300 min-h-screen px-6 md:px-24 md:pt-20">
      {/* Header Row */}
      <div className="flex justify-between  items-center mb-12 mt-20">
        <h1
          className="text-white text-3xl md:text-7xl"
          style={poppinsBold}
        >
          Terms of Service
        </h1>
        <span
          className="text-[#2EB24C] text-lg md:text-5xl whitespace-nowrap"
          style={poppinsBold}
        >
          E-Summit
        </span>
      </div>

      {/* Content */}
      <section className="max-w-5xl space-y-10 md:pb-20 md:ml-20">
        <div>
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using the{" "}
            <span className="text-green-400 font-semibold">KIIT E-Cell</span> website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree,{" "}
            <span className="text-green-400 font-semibold">please do not use our website</span>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">2. Use License</h2>
          <p className="mt-2">
            Permission is granted to temporarily download one copy of the materials on{" "}
            <span className="text-green-400 font-semibold">KIIT E-Cell's site</span> for personal, non-commercial use. This is a{" "}
            <span className="text-green-400 font-semibold">license</span>, not a transfer of title.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">3. Disclaimer</h2>
          <p className="mt-2">
            All materials on the website are provided{" "}
            <span className="text-green-400 font-semibold">"as is"</span>. KIIT E-Cell makes no warranties, expressed or implied, and hereby disclaims all other warranties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">4. Limitations</h2>
          <p className="mt-2">
            In no event shall{" "}
            <span className="text-green-400 font-semibold">KIIT E-Cell</span> or its affiliates be liable for any damages arising out of the use or inability to use the materials on the website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">5. Modifications</h2>
          <p className="mt-2">
            KIIT E-Cell may revise these terms at any time without notice. By using this site, you agree to be bound by the{" "}
            <span className="text-green-400 font-semibold">current version</span> of the Terms of Service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">6. Governing Law</h2>
          <p className="mt-2">
            These terms are governed by and construed in accordance with the{" "}
            <span className="text-green-400 font-semibold">laws of India</span>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
    </div>
  );
};

export default Tos;
