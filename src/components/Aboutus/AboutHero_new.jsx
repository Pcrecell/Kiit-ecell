const Index = () => {
    return (
        <div className="min-h-auto bg-black pt-4 sm:pt-6 lg:pt-10">
            {/* Upper Section with Background Image - About Us */}
            <div className="relative overflow-hidden min-h-auto flex lg:flex-row">
                {/* Left Sidebar with Vertical Text */}
                <div className="hidden lg:flex w-32 xl:w-48 bg-black items-center justify-center pl-2 xl:pl-4 relative">
                    <div className="flex flex-row items-center justify-center gap-1 xl:gap-2 h-full">
                        {/* Vertical Text */}
                        <div
                            className="font-anton text-4xl xl:text-[88px] font-bold text-transparent bg-gradient-to-b from-[#222] to-gray-300 bg-clip-text tracking-wider"
                            style={{
                                writingMode: 'vertical-lr',
                                transform: 'rotate(180deg)',
                                letterSpacing: '0.2em',
                                lineHeight: '1.1',
                            }}
                        >
                            KIIT ECELL
                        </div>

                        {/* Vertical Gradient Bar */}
                        <div className="w-4 xl:w-7 h-full bg-gradient-to-b from-gray-300 to-black opacity-70"></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-black relative">
                    {/* Background Image with Gradients */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.9) 100%),
                                url('https://ik.imagekit.io/d73k0qzwc/image%2032.png?updatedAt=1749619991522')
                            `
                        }}
                    ></div>

                    {/* Top and Bottom Gradient Overlays */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-24 sm:h-36 bg-gradient-to-b from-black to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-24 sm:h-36 bg-gradient-to-t from-black to-transparent" />
                    </div>

                    {/* Geometric pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `
                                linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%),
                                linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%)
                            `,
                            backgroundSize: '40px 40px',
                            backgroundPosition: '0 0, 20px 20px'
                        }}
                    ></div>

                    <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 lg:pl-20 xl:pl-80 min-h-screen lg:min-h-auto flex flex-col justify-center">
                        {/* Mobile Title for smaller screens */}
                        <div className="lg:hidden mb-8 text-center">
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-['Milker'] font-bold text-transparent bg-gradient-to-r from-[#222] to-gray-300 bg-clip-text tracking-wider">
                                KIIT ECELL
                            </h1>
                        </div>

                        {/* About Us Section */}
                        <div className="mb-12 sm:mb-16 lg:mb-20">
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Milker'] font-bold text-white mb-4 sm:mb-6 lg:mb-8 tracking-wider text-center lg:text-left leading-tight">
                                ABOUT US
                            </h1>
                            <div className="text-white font-['Poppins'] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed max-w-[90vw] sm:max-w-[80vw] lg:max-w-[65vw] text-justify opacity-90 px-2 sm:px-0 space-y-3 xs:space-y-4 sm:space-y-6">
                                <p>
                                    KIIT Entrepreneurship Cell (ECELL) is a nonprofit organisation dedicated to empowering student entrepreneurs under the motto: "Imagine, Innovate, Implement." We see entrepreneurs as pioneers—visionaries who innovate and drive change to build a better future.
                                </p>
                                <p>
                                    Our goal is to nurture and support these changemakers by offering mentorship, exposure, networking opportunities, and resources to help transform ideas into successful ventures. By fostering a vibrant entrepreneurial spirit, we create a strong support system for aspiring business leaders within KIIT.
                                </p>
                                <p>
                                    With over a decade of experience, KIIT ECELL regularly hosts flagship events such as the KIIT E-Summit, Hult Prize KIIT, Internship Camps, Design XP, Speaker Sessions, Star Nights, and numerous workshops and seminars. We also extend our impact beyond campus by organising events and mentoring programs for K12 schools, nurturing innovation from an early age.
                                </p>
                                <p>
                                    Our events consistently attract prominent speakers and distinguished guests, reflecting our commitment to building a dynamic ecosystem where entrepreneurs can thrive. At KIIT ECELL, we welcome passionate minds eager to learn, grow, and lead the future of entrepreneurship.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
