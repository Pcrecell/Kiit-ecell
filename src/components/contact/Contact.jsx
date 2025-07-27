// Assuming Footer and NavbarD are in their respective paths
import Footer from "../Footer/Footer";
import NavbarD from "../navbar/NavbarD";
import BgMap from "./BgMap";
import FormHandler from "./FormHandler";
import React, { useState, useRef, useEffect } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91", // Default to India
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  
  const [emailValidation, setEmailValidation] = useState({
    isValid: true,
    message: ""
  });

  const [triggerApiSend, setTriggerApiSend] = useState(false);

  const [isFormHovered, setIsFormHovered] = useState(false);
  const bgMapRef = useRef(null);

  // State to track if the screen is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Effect to determine screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      // Define your mobile breakpoint (e.g., 768px for md breakpoint in Tailwind)
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect to handle form submission cleanup
  useEffect(() => {
    if (!triggerApiSend) {
      // Additional cleanup when trigger is reset
      return;
    }
  }, [triggerApiSend]);

  const handleMouseEnterForm = () => {
    setIsFormHovered(true);
  };

  const handleMouseLeaveForm = () => {
    setIsFormHovered(false);
  };

  // Email validation function - Open to all email domains
  const validateEmail = (email) => {
    // Standard email regex pattern for general validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      return "Email is required";
    }
    
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Check for @ symbol specifically
    if (!email.includes('@')) {
      return "Email must contain @ symbol";
    }

    // Check domain format
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      return "Invalid email format";
    }

    const [localPart, domain] = emailParts;
    
    // Validate local part (before @)
    if (localPart.length === 0) {
      return "Email address cannot start with @";
    }

    // Validate domain part (after @)
    if (domain.length === 0) {
      return "Email address cannot end with @";
    }

    if (!domain.includes('.')) {
      return "Email domain must contain a dot (.)";
    }

    // Check for valid domain format
    const domainParts = domain.split('.');
    if (domainParts.some(part => part.length === 0)) {
      return "Invalid domain format";
    }

    // Check for minimum domain extension length
    const lastPart = domainParts[domainParts.length - 1];
    if (lastPart.length < 2) {
      return "Domain extension must be at least 2 characters";
    }

    return null; // Valid email
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      // Remove any characters that are not letters or spaces
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'phone') {
      // Remove any characters that are not numbers
      const filteredValue = value.replace(/[^0-9]/g, '').slice(0, 16);
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else if (name === 'email') {
      // Basic email validation while typing
      setFormData({
        ...formData,
        [name]: value,
      });
      
      if (value.length > 0) {
        const emailError = validateEmail(value);
        setEmailValidation({
          isValid: !emailError,
          message: emailError || ""
        });
      } else {
        setEmailValidation({
          isValid: true,
          message: ""
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setFormStatus({ loading: false, error: null, success: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (formStatus.loading || triggerApiSend) {
      return;
    }
    
    // Validate email before submission
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setFormStatus({ loading: false, error: emailError, success: false });
      return;
    }

    // Validate phone number
    if (formData.phone.length < 10 || formData.phone.length > 16) {
      setFormStatus({ loading: false, error: "Phone number must be between 10 and 16 digits", success: false });
      return;
    }

    // Validate name
    if (formData.name.trim().length < 2) {
      setFormStatus({ loading: false, error: "Name must be at least 2 characters long", success: false });
      return;
    }

    // Validate message
    if (formData.message.trim().length < 10) {
      setFormStatus({ loading: false, error: "Message must be at least 10 characters long", success: false });
      return;
    }

    console.log("Form submitted locally:", formData);
    setFormStatus({ loading: true, error: null, success: false });
    setTriggerApiSend(true);
  };

  // Callback for when FormHandler successfully sends data
  const handleSuccess = (result) => {
    setTriggerApiSend(false); // Reset trigger first to prevent multiple calls
    setFormStatus({ loading: false, error: null, success: true });
    // Optionally clear the form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      message: "",
    });
  };

  // Callback for when FormHandler encounters an error
  const handleError = (errorMessage) => {
    setTriggerApiSend(false); // Reset trigger first to prevent multiple calls
    setFormStatus({ loading: false, error: errorMessage, success: false });
  };

  return (
    <>
      <style jsx>{`
        select option {
          position: relative !important;
          top: auto !important;
          bottom: auto !important;
        }
        select {
          position: relative !important;
        }
        /* Mobile responsiveness for dropdown */
        @media (max-width: 640px) {
          select {
            min-width: 80px !important;
            max-width: 100px !important;
            font-size: 12px !important;
            padding: 6px 4px !important;
          }
        }
        /* Tablet responsiveness */
        @media (min-width: 641px) and (max-width: 1024px) {
          select {
            min-width: 85px !important;
            max-width: 105px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
      {/* BgMap as background */}
      <div className="fixed inset-0 -z-0 pointer-events-auto">

        <BgMap ref={bgMapRef} disableDragging={isMobile || isFormHovered} />
      </div>
      <NavbarD />
      <section
        id="contact"

        className={`pt-96 pb-8 md:pt-24 md:pb-2 text-white min-h-screen flex items-center justify-center ${isMobile ? '' : 'md:justify-end'} relative z-10 pointer-events-none`}
      >
        <div className="container mx-auto px-4 flex justify-center md:justify-end pointer-events-none">
          <div className="w-full max-w-2xl pointer-events-none">
            {/* Contact Form */}
            <div
              className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-gray-700/50 pointer-events-auto"
              onMouseEnter={handleMouseEnterForm}
              onMouseLeave={handleMouseLeaveForm}
            >
              {/* Header inside form */}
              <div className="text-left mb-6 md:mb-8">
                <h2
                  className={
                    isMobile
                      ? "text-3xl font-bold mb-3"
                      : "text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  }
                >
                  Let's talk{" "}!
                  
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base ${
                        emailValidation.isValid 
                          ? 'border-gray-600 focus:ring-blue-500' 
                          : 'border-red-500 focus:ring-red-500'
                      }`}
                      placeholder="Your Email Address"
                    />
                    {!emailValidation.isValid && emailValidation.message && (
                      <p className="text-red-400 text-xs mt-1">{emailValidation.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-gray-300"
                    >
                      Phone No.
                    </label>
                    <div className="flex w-full relative" style={{ overflow: 'visible', zIndex: 1 }}>
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-auto min-w-[80px] max-w-[100px] sm:min-w-[85px] sm:max-w-[105px] md:min-w-[90px] md:max-w-[110px] px-1 py-2 sm:px-2 md:px-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-xs sm:text-sm md:text-base border-r-0"
                        style={{
                          direction: 'ltr',
                          textAlign: 'left',
                          position: 'relative',
                          zIndex: 10
                        }}
                      >
                        <option value="+93">AFG +93</option>
                        <option value="+54">ARG +54</option>
                        <option value="+61">AUS +61</option>
                        <option value="+43">AUT +43</option>
                        <option value="+973">BHR +973</option>
                        <option value="+880">BGD +880</option>
                        <option value="+975">BTN +975</option>
                        <option value="+55">BRA +55</option>
                        <option value="+673">BRN +673</option>
                        <option value="+855">KHM +855</option>
                        <option value="+86">CHN +86</option>
                        <option value="+45">DNK +45</option>
                        <option value="+20">EGY +20</option>
                        <option value="+358">FIN +358</option>
                        <option value="+33">FRA +33</option>
                        <option value="+49">DEU +49</option>
                        <option value="+852">HKG +852</option>
                        <option value="+91">IND +91</option>
                        <option value="+62">IDN +62</option>
                        <option value="+98">IRN +98</option>
                        <option value="+964">IRQ +964</option>
                        <option value="+972">ISR +972</option>
                        <option value="+39">ITA +39</option>
                        <option value="+81">JPN +81</option>
                        <option value="+962">JOR +962</option>
                        <option value="+254">KEN +254</option>
                        <option value="+965">KWT +965</option>
                        <option value="+856">LAO +856</option>
                        <option value="+961">LBN +961</option>
                        <option value="+853">MAC +853</option>
                        <option value="+60">MYS +60</option>
                        <option value="+960">MDV +960</option>
                        <option value="+52">MEX +52</option>
                        <option value="+976">MNG +976</option>
                        <option value="+95">MMR +95</option>
                        <option value="+977">NPL +977</option>
                        <option value="+31">NLD +31</option>
                        <option value="+234">NGA +234</option>
                        <option value="+47">NOR +47</option>
                        <option value="+968">OMN +968</option>
                        <option value="+92">PAK +92</option>
                        <option value="+63">PHL +63</option>
                        <option value="+974">QAT +974</option>
                        <option value="+7">RUS +7</option>
                        <option value="+966">SAU +966</option>
                        <option value="+65">SGP +65</option>
                        <option value="+27">ZAF +27</option>
                        <option value="+82">KOR +82</option>
                        <option value="+34">ESP +34</option>
                        <option value="+94">LKA +94</option>
                        <option value="+249">SDN +249</option>
                        <option value="+46">SWE +46</option>
                        <option value="+41">CHE +41</option>
                        <option value="+963">SYR +963</option>
                        <option value="+886">TWN +886</option>
                        <option value="+66">THA +66</option>
                        <option value="+90">TUR +90</option>
                        <option value="+971">ARE +971</option>
                        <option value="+44">GBR +44</option>
                        <option value="+1">USA +1</option>
                        <option value="+84">VNM +84</option>
                        <option value="+967">YEM +967</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="flex-1 w-full px-2 py-2 sm:px-3 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm md:text-base border-l-0"
                        placeholder="Your Phone No."
                        maxLength="16"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={isMobile ? 3 : 5}
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-gray-400 text-sm md:text-base"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center md:justify-end">
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full bg-white py-2 px-5 font-bold text-black text-sm transition-colors duration-200 hover:bg-gray-100 md:w-auto md:py-3 md:px-8 md:text-lg rounded-lg"
                  >
                    {formStatus.loading ? 'SENDING...' : 'SEND'}
                  </button>
                </div>
              </form>

              {/* Display Form Status Messages */}
              {formStatus.loading && (
                <p className="text-blue-400 text-center mt-4">Sending your message...</p>
              )}
              {formStatus.error && (
                <p className="text-red-500 text-center mt-4">Error: {formStatus.error}</p>
              )}
              {formStatus.success && (
                <p className="text-green-500 text-center mt-4">Message sent successfully!</p>
              )}

              {/* FormHandler component for API interaction */}
              {triggerApiSend && (
                <FormHandler
                  formData={formData}
                  apiEndpoint={`${process.env.REACT_APP_API_URL}/contact`}
                  onSuccess={handleSuccess}
                  onError={handleError}
                  triggerSend={triggerApiSend}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;