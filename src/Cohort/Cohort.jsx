import React, { useRef, useEffect, useState } from 'react';

// No need to import Cohort.css anymore
import Session from './Session';
import CohortCard from '../Cohort/CohortCard'; // Assuming these are still needed for their JSX structure
import CohortCard2 from './CohortCard2';
import CohortCard3 from './CohortCard3';
import Footer from './Footer';

// Define the data arrays outside the component for better readability and performance
const members = [
    {
        id: 1,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/img%201.png",
        title: "Techie",
        description: "Ready to build groundbreaking products Leverage your coding genius and turn prototypes into real-world solutions."
    },
    {
        id: 2,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/img%202.png",
        title: "Marketing & Sales",
        description: "Hustle your way to traction. Own your market,land & first 100 users and become the growth engine of your startup."
    },
    {
        id: 3,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/img%203.png",
        title: "Visionary / Founder",
        description: "Big ideas deserve big action. Lead your team from concept to reality and shape the future you want to see."
    }, {
        id: 4,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/img%204.png",
        title: "Passion Builder ",
        description: "Stand out from the crowd. Launch a tangible product, secure real users, and dazzle future employers or investors."
    }
];

const mentors = [
    {
        id: 1,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KlpkftVZnoIt82QHzxBAFwaV1EG85baIDw&s",
        name: "Sarvagya Singh",
        pos: "Chairman, E-Cell KIIT"
    },
    {
        id: 2,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KlpkftVZnoIt82QHzxBAFwaV1EG85baIDw&s",
        name: "Aman Kumar",
        pos: "Managing Director, E-Cell KIIT"
    },
    {
        id: 3,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KlpkftVZnoIt82QHzxBAFwaV1EG85baIDw&s",
        name: "Ayush Nayak",
        pos: "HR, E-Cell KIIT"
    }
];

const teammates = [
    {
        id: 1,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/Prof.-Saranjit-Singh.jpg",
        name: "Prof.(Dr.)Saranjit singh",
        role: "vice chancellor KIIT DU",
        description: "docodciocjcci"
    },
    {
        id: 2,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/suman%20bht.jpeg",
        name: "Suman Bhattacharya",
        role: "prof. Incharge",
        description: "docodciocjcci"
    },
    {
        id: 3,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/priyadarshi%20biswal.jpeg",
        name: "Priyadarshi Biswal",
        role: "Dean Kareer School,KIIT",
        description: "docodciocjcci"
    },
    {
        id: 4,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/vishal%20jc.jpeg",
        name: "Vishal JC",
        role: "KIIT T.B.I. Head",
        description: "docodciocjcci"
    },
    {
        id: 5,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/sarvagya.png",
        name: "Sarvagya Singh",
        role: "ChairPerson, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 6,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/aman.png",
        name: "Aman kumar",
        role: "Managing Director, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 7,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/ayush.png",
        name: "Ayush Nayak",
        role: "HR, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 8,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/anmol.png",
        name: "Anmol Tiwari",
        role: "Liaison officer P.C.R, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 9,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/ayush%20k.png",
        name: "Ayush Kshitij",
        role: "Liaison officer Tech., E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 10,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/dhruv.png",
        name: "Dhruv Duggal",
        role: "Liaison officer Marketing, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 11,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/sarthak.png",
        name: "Sarthak",
        role: "Senior Excutive, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 12,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/abhishek%20t.png",
        name: "Abhishek Tripathy",
        role: "Event Lead, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 13,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/abhishek.png",
        name: "Abhishek Sahoo",
        role: "Liaison officer P.C.R, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 14,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/manshi.png",
        name: "Manshi Jaiswal",
        role: "Liaison officer Research & Development, E-Cell KIIT",
        description: "docodciocjcci"
    },
    {
        id: 15,
        imgURL: "https://ik.imagekit.io/d73k0qzwc/niladri.png",
        name: "Niladri Sarkar",
        role: "Liaison officer Broadcasting, E-Cell KIIT",
        description: "docodciocjcci"
    },
];

// Helper functions for rendering cards - assuming CohortCard, CohortCard2, CohortCard3 are functional components
function createCard2(member) {
    return <CohortCard key={member.id} {...member} />;
}

function createCard3(mentor) {
    return <CohortCard2 key={mentor.id} {...mentor} />;
}

function createCard4(teammate) {
    return <CohortCard3 key={teammate.id} {...teammate} />; // Assuming CohortCard is used for teammates based on structure
}

function Cohort() {
    const teammatesRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const scroll = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = ref.current.offsetWidth / 3;
            ref.current.scrollLeft += direction * scrollAmount;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // Replaced .Parent with Tailwind classes
        <div className="min-h-screen flex flex-col bg-[#050527] w-full absolute top-0 overflow-x-hidden">
            {/* Hero Section */}
            <div
                className="w-full min-h-screen shadow-md relative z-10 flex flex-col justify-between"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.475)), url("https://ik.imagekit.io/d73k0qzwc/image20.png") center/cover no-repeat`,
                }}
            >
                {/* Navbar */}
                <nav className="fixed top-0 left-0 w-full bg-[#07021f] h-[clamp(70px,9vh,90px)] flex justify-between items-center z-50 px-4 sm:px-8 lg:px-12 shadow-md">
                    <div className="logo flex items-center">
                        <img
                            src="https://ik.imagekit.io/d73k0qzwc/BuildSchool.png"
                            alt="BuildSchool Logo"
                            className="max-w-[clamp(90px,12vw,120px)] h-auto object-contain"
                        />
                    </div>
                    <div className="btn text-right">
                        <button className="w-fit py-[clamp(0.5rem,1.2vw,1rem)] px-[clamp(1rem,2vw,1.4rem)] bg-[#3d45d8] text-white font-sans border-none rounded-full cursor-pointer text-[clamp(0.9rem,1.6vw,1.1rem)] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:bg-[#4a51e1]">
                            Register your team
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="w-full pt-[clamp(7rem,15vh,10rem)] pb-10 px-4 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-sans leading-tight max-w-4xl">
                        <span className="text-white">Build</span>
                        <span className="text-[#2c68d1]">School</span>
                        <span className="text-white">: Your Launchpad to </span>
                        <span className="text-[#2c68d1] italic">transform</span>
                        <span className="text-white"> Ideas</span>
                    </h1>
                    <p className="text-lg sm:text-xl font-light text-white font-manrope mt-6 max-w-2xl">
                        Accelerate your startup journey with a cohort of driven college founders. Get the tools, mentorship, and network to launch and scale your venture in 11 weeks and make a real impact.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-[clamp(2rem,5vh,4rem)] w-full max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full px-2">
                            <div className="flex justify-center sm:justify-end">
                                <a
                                    href="https://forms.gle/TVbJ8Cf1TbfwnU7bA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="w-full sm:w-auto min-w-[250px] h-[50px] rounded-md px-8 bg-[#3d45d8] text-white border border-transparent hover:bg-[#4a51e1] hover:-translate-y-1 transition-all duration-200 ease-in-out">
                                        Register your team
                                    </button>
                                </a>
                            </div>
                            <div className="flex justify-center sm:justify-start">
                                <a
                                    href="https://forms.gle/TVbJ8Cf1TbfwnU7bA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="w-full sm:w-auto min-w-[250px] h-[50px] rounded-md px-8 bg-black/80 text-white hover:-translate-y-1 transition-all duration-200 ease-in-out">
                                        Explore Our Portal
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Partners */}
                {/* Our Partners */}
                <div className="w-full mt-4">
                    <div className="font-manrope text-[#AEB0B6] font-medium text-base sm:text-lg flex justify-center tracking-widest mb-6 sm:mb-8">
                        OUR PARTNERS
                    </div>

                    <div className="flex justify-center bg-white bg-opacity-25 backdrop-blur-sm w-full min-h-[70px] py-4 overflow-x-auto  whitespace-nowrap gap-x-32">
                        {[
                            "kiit.png",
                            "Tbi.png",
                            "notion.png",
                            "google.png",
                            "aws.png",
                            "YNOS341469-removebg-preview.png",
                            "tie.png",
                        ].map((logo, idx) => (
                            <img
                                key={idx}
                                src={`https://ik.imagekit.io/d73k0qzwc/${logo}`}
                                alt={`Partner ${idx + 1}`}
                                className="w-[clamp(30px,7vw,50px)] h-auto object-contain flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* Moto Section 1 */}
            <div className="h-auto flex flex-col justify-center items-center text-center text-[clamp(1rem,2vw,1.25rem)] font-bold gap-[clamp(1rem,2vh,1.5rem)] py-[clamp(1rem,3vw,2rem)] text-white">
                <div className="flex flex-col justify-between items-center mt-[clamp(2rem,5vh,4rem)] gap-[clamp(2rem,4vh,3rem)]">
                    <p className="w-full text-sm font-manrope font-semibold tracking-widest">WHO IS BUILDSCHOOL FOR?</p>
                    <p className="font-manrope font-semibold w-full max-w-[1000px] text-2xl sm:text-3xl">Bringing together a new generation of risk-takers, innovators, and doers.</p>
                </div>
                <div className="flex flex-row flex-wrap justify-center gap-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,3vw,2rem)]">
                    {members.map(createCard2)}
                </div>
            </div>

            {/* Moto Section 2 */}
            <div className="h-auto flex flex-col justify-center items-center text-center text-[clamp(1rem,2vw,1.25rem)] font-bold gap-[clamp(1rem,2vh,1.5rem)] py-[clamp(1rem,3vw,2rem)] text-white">
                <div className="flex flex-col justify-between items-center mt-[clamp(2rem,5vh,4rem)] gap-[clamp(2rem,4vh,3rem)]">
                    <p className="w-full text-sm font-manrope font-semibold tracking-widest">YOUR 11-WEEKS IMMERSION PROGRAM</p>
                    <p className="font-manrope font-semibold w-full max-w-[1000px] text-2xl sm:text-3xl">Learn. Build. Launch. Repeat.</p>
                </div>
                <div className="w-full">
                    <Session />
                </div>
            </div>

            {/* Moto Section 3 - Mentors */}
            <div className="h-auto flex flex-col justify-center items-center text-center text-[clamp(1rem,2vw,1.25rem)] font-bold gap-[clamp(1rem,2vh,1.5rem)] py-[clamp(1rem,3vw,2rem)] text-white">
                <div className="flex flex-col justify-between items-center mt-[clamp(2rem,5vh,4rem)] gap-[clamp(2rem,4vh,3rem)]">
                    <p className='w-full text-sm font-manrope font-semibold tracking-widest'>MEET YOUR MENTORS</p>
                    <p className="font-manrope font-semibold w-full max-w-[1000px] text-2xl sm:text-3xl">Visionaries who have been there, done that, and are now here to accelerate your growth</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {mentors.map(createCard3)}
                </div>
            </div>

            {/* Moto Section 4 - Core Team */}
            <div className="h-auto flex flex-col justify-center items-center text-center text-[clamp(1rem,2vw,1.25rem)] font-bold gap-[clamp(1rem,2vh,1.5rem)] py-[clamp(1rem,3vw,2rem)] text-white">
                <div className="flex flex-col justify-between items-center mt-[clamp(2rem,5vh,4rem)] gap-[clamp(2rem,4vh,3rem)]">
                    <p className='w-full text-sm font-manrope font-semibold tracking-widest'>OUR CORE TEAM</p>
                    <p className="font-manrope font-semibold w-full max-w-[1000px] text-2xl sm:text-3xl">Why we built Build School and how we’re shaping India’s next generation of founders</p>
                </div>
                {isMobile ? (
                    <div className="relative w-full flex items-center">
                        <button className="text-white text-3xl absolute left-0 z-10 bg-black bg-opacity-50 p-2 cursor-pointer" onClick={() => scroll(teammatesRef, -1)}>
                            &lt;
                        </button>
                        <div
                            className="flex overflow-x-auto snap-x snap-mandatory w-full scroll-smooth no-scrollbar px-5"
                            ref={teammatesRef}
                        >
                            {teammates.map((teammate) => (
                                <div
                                    key={teammate.id}
                                    className="flex-none w-[calc(100%-40px)] mx-2 snap-start min-w-[250px]"
                                >
                                    {createCard4(teammate)}
                                </div>
                            ))}
                        </div>
                        <button className="text-white text-3xl absolute right-0 z-10 bg-black bg-opacity-50 p-2 cursor-pointer" onClick={() => scroll(teammatesRef, 1)}>
                            &gt;
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {teammates.map(createCard4)}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Cohort;