const Index = () => {
    return (
        <div className="min-h-auto bg-black flex flex-col lg:flex-row pt-4 sm:pt-6 lg:pt-10">
            {/* Left Sidebar with Vertical Text */}
            <div className="hidden lg:flex w-40 xl:w-48 bg-black items-center justify-center relative">
                <div className="flex items-center justify-center h-full">
  {/* Vertical Text */}
  <div
    className="font-anton text-6xl sm:text-7xl md:text-[80px] xl:text-[100px] font-bold text-transparent bg-gradient-to-b from-[#222] to-gray-300 bg-clip-text tracking-wider"
    style={{
      writingMode: 'vertical-lr',
      transform: 'rotate(180deg)',
      letterSpacing: '0.2em',
      lineHeight: '1',
    }}
  >
    KIIT ECELL
  </div>

  {/* Vertical Gradient Bar */}
  <div className="ml-2 w-[4px] h-[80%] bg-gradient-to-b from-gray-300 to-black opacity-70 rounded-full" />
</div>

            </div>
            {/* Main Content Area */}
            <div className="flex-1 bg-black">
                {/* Upper Section with Background Image - About Us */}
                <div className="relative overflow-hidden min-h-auto">
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
                    </div>                    {/* Geometric pattern overlay */}
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
                        <div className="lg:hidden mb-10 flex flex-col justify-center items-center">
                            {/* Rotated Vertical Text */}
                            <div
                                className="font-anton text-5xl sm:text-6xl font-bold text-transparent bg-gradient-to-b from-[#222] to-gray-300 bg-clip-text tracking-wider m-0 p-0 leading-none"
                                style={{
                                    writingMode: 'vertical-lr',
                                    transform: 'rotate(270deg)',
                                    letterSpacing: '0.2em',
                                    lineHeight: '1',
                                    marginBottom: '-7rem', // tightens gap between text and bar
                                }}
                            >
                                KIIT ECELL
                            </div>

                            {/* Horizontal Gradient Bar below text */}
                            <div className="h-2 w-64 sm:w-80 bg-gradient-to-r from-black to-gray-300 opacity-70 rounded-full" />
                        </div>

                        {/* About Us Section */}
                        <div className="mb-12 sm:mb-16 lg:mb-20">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Milker'] font-bold text-white mb-4 sm:mb-6 lg:mb-8 tracking-wider text-center lg:text-left">
                                ABOUT US
                            </h1>
                            <p className="text-white font-['Poppins'] text-sm sm:text-m lg:text-xl leading-relaxed max-w-full lg:max-w-2xl text-justify opacity-90 px-2 sm:px-0">
                               
The KIIT Entrepreneurship Cell (KIIT E-Cell) is the official student-driven body at Kalinga Institute of Industrial Technology (KIIT), dedicated to fostering a culture of innovation, creativity, and entrepreneurship among students. It serves as a dynamic platform where aspiring entrepreneurs are nurtured through hands-on exposure, mentorship from industry leaders, interactive workshops, and real-world startup experiences. With a mission to transform ideas into viable ventures, KIIT E-Cell regularly organizes flagship events like E-Summit, startup bootcamps, and pitch competitions, drawing participation from across India. Backed by a vibrant ecosystem of innovators, mentors, and investors, KIIT E-Cell strives to empower students to think independently, act boldly, and lead purposefully in shaping the future of entrepreneurship.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;