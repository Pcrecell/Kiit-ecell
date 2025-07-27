import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import EsummitNavbar from "../Navbar/EsummitNavbar";
import CustomScrollBar from "../CustomScrollBar";

const PP = () => {
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
        <div className="flex justify-between items-center mb-12 mt-20">
          <h1 className="text-white text-3xl md:text-7xl" style={poppinsBold}>
            Privacy Policy
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
            <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
            <p className="mt-2">
              This Privacy Policy describes how{" "}
              <span className="text-green-400 font-semibold">KIIT E-Cell E-Summit</span> collects, uses, and protects the personal information of users who visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
            <p className="mt-2">
              We may collect personal information such as your name, email address, phone number, and any other information you voluntarily provide through forms or registrations on our site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">3. Use of Information</h2>
            <p className="mt-2">
              The information we collect is used solely for{" "}
              <span className="text-green-400 font-semibold">event-related communication, registration, and improvement of our services</span>. We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">4. Cookies</h2>
            <p className="mt-2">
              Our website may use cookies to enhance user experience. You may choose to disable cookies through your browser settings, though some features may not function properly as a result.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
            <p className="mt-2">
              We implement standard security practices to protect your data from unauthorized access, alteration, or disclosure. However,{" "}
              <span className="text-green-400 font-semibold">no online transmission is 100% secure</span>, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">6. Third-Party Services</h2>
            <p className="mt-2">
              We may use third-party tools for analytics or communication. These services may collect information as governed by their own privacy policies, independent of ours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">7. Changes to This Policy</h2>
            <p className="mt-2">
              <span className="text-green-400 font-semibold">KIIT E-Cell</span> reserves the right to modify this Privacy Policy at any time. Changes will be reflected on this page with an updated date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">8. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <span className="text-green-400 font-semibold">ecell@kiit.ac.in</span>.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default PP;
