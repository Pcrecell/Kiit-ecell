import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";

// Initiative card data
const initiatives = [
  {
    id: 1,
    title: "Pitching for Global Impact",
    description: "The Hult Prize is a prestigious competition where students pitch innovative startup ideas to address global issues.",
    color: "#FF69B4",
    url : "/hult-prize"
  },
  {
    id: 2,
    title: "Internship Opportunities for College Students",
    description: "I-Camp connects college students with diverse internships, empowering them to gain practical experience.",
    color: "#007BFF",
    url : "/i-camp"
  },
  {
    id: 3,
    title: "Wisdom from Industry Leaders",
    description: "Growth Garage is our podcast series featuring insights from minds behind major brands, to help you build and scale your business.",
    color: "white",
    url: "https://www.youtube.com/@KIIT-ECELL"
  },
  {
    id: 4,
    title: "Ideas to Thriving Ventures",
    description: "Build School is an intensive 11-week program guiding you from idea to enterprise, providing the knowledge and tools to transform aspirations into successful ventures.",
    color: "#007BFF",
    url: "/build-school"
  },
  {
    id: 5,
    title: "Workshops for Entrepreneurial Growth",
    description: "Skill Sprint offers dynamic upskilling workshops led by experienced founders and mentors.",
    color:"white",
    url: "/build-school"
  },
]

// Static Tech Background
const StaticTechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ top: `${(i + 1) * 5}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      {/* Vertical lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-line-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"
            style={{ left: `${(i + 1) * 5}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Tech nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.floor(Math.random() * 4) + 2
          const x = Math.floor(Math.random() * 90) + 5
          const y = Math.floor(Math.random() * 90) + 5
          const color = i % 2 === 0 ? "#007BFF" : "#FF69B4"

          return (
            <div
              key={`node-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: color,
                opacity: 0.15,
              }}
            />
          )
        })}
      </div>

      {/* Tech circuit pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L20 200 M40 0 L40 200 M60 0 L60 200 M80 0 L80 200 M100 0 L100 200 M120 0 L120 200 M140 0 L140 200 M160 0 L160 200 M180 0 L180 200"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M0 20 L200 20 M0 40 L200 40 M0 60 L200 60 M0 80 L200 80 M0 100 L200 100 M0 120 L200 120 M0 140 L200 140 M0 160 L200 160 M0 180 L200 180"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="20" cy="20" r="2" fill="#007BFF" />
          <circle cx="60" cy="60" r="2" fill="#FF69B4" />
          <circle cx="100" cy="100" r="2" fill="#007BFF" />
          <circle cx="140" cy="140" r="2" fill="#FF69B4" />
          <circle cx="180" cy="180" r="2" fill="#007BFF" />
          <circle cx="180" cy="20" r="2" fill="#FF69B4" />
          <circle cx="140" cy="60" r="2" fill="#007BFF" />
          <circle cx="100" cy="180" r="2" fill="#FF69B4" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  )
}

// Initiative Card component with improved animations
const InitiativeCard = ({ initiative, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    onClick()
    setTimeout(() => setIsClicked(false), 800)
  }

  // Card variants for animations
  const cardVariants = {
    initial: {
      rotateY: isActive ? 0 : 15,
      opacity: isActive ? 1 : 0.7,
      scale: 1,
      y: 0,
    },
    hover: {
      rotateY: 0,
      opacity: 1,
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic bezier for smoother motion
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={`relative flex flex-col justify-between p-6 rounded-lg bg-black/90 text-white h-[320px] w-[280px] mx-4 cursor-pointer backdrop-blur-sm overflow-hidden ${
        isActive ? "z-10" : "z-0"
      }`}
      style={{
       boxShadow: isHovered
  ? `0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 25px 5px ${initiative.color}`
  : `0 10px 30px -15px rgba(0, 0, 0, 0.3), 0 0 5px ${initiative.color === "white" ? "rgba(255, 255, 255, 0.3)" : `${initiative.color}30`}`,
        borderLeft: `2px solid ${initiative.color}`,
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={{
        rotateY: isActive ? 0 : 15,
        opacity: isActive ? 1 : 0.7,
        scale: isClicked ? 1.02 : 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Tech pattern inside card */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke={initiative.color} strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={initiative.color} strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke={initiative.color} strokeWidth="1" />
          <path d="M50 10 L50 90" stroke={initiative.color} strokeWidth="1" />
          <path d="M10 50 L90 50" stroke={initiative.color} strokeWidth="1" />
        </svg>
      </div>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0.7, scale: 0.3 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ backgroundColor: initiative.color, zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {/* Glowing border effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: `inset 0 0 0 1px ${initiative.color}80`,
              zIndex: 5,
            }}
          />
        )}
      </AnimatePresence>

      {/* Card number indicator with animation */}
      <motion.div
        className="absolute top-4 right-4 text-xs font-mono opacity-50"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {String(initiative.id).padStart(2, "0")}.
      </motion.div>

      <div className="mt-6 relative z-10">
        {/* Futuristic accent line with animation */}
        <motion.div
          className="w-12 h-1 mb-4"
          style={{ backgroundColor: initiative.color }}
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        />

        <motion.h3
          className="text-xl font-bold mb-3 font-mono tracking-tight"
          style={{ color: initiative.color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {initiative.title}
        </motion.h3>

        <motion.p
          className="text-gray-300 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {initiative.description}
        </motion.p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <motion.div
          className="h-px bg-gray-700"
          initial={{ width: 0 }}
          animate={{ width: "33%" }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />

        <motion.div
          className="w-10 h-10 rounded-md flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            border: `1px solid ${initiative.color}`,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 0 15px ${initiative.color}80`,
          }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Arrow with animation */}
          <motion.span
            className="text-white font-mono relative z-10"
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>

          {/* Button background animation on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ backgroundColor: initiative.color, opacity: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Initiatives Section component
export default function InitiativesSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const navigate = useNavigate()

  const location = useLocation();

  useEffect(() => {
    if(location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({behavior: "smooth"})
      }
    }
  }, [location])

  // Start animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % initiatives.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const handlePrev = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev - 1 + initiatives.length) % initiatives.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev + 1) % initiatives.length)
  }

  const handleCardClick = (index) => {
  setAutoPlay(false)
  setActiveIndex(index)
  const initiative = initiatives[index]
  if (initiative?.url) {
    setTimeout(() => {
      if (initiative.url.startsWith("/")) {
        navigate(initiative.url);
      } else {
        window.open(initiative.url, "_blank");
      }
    }, 300) // slight delay for animation to finish
  }
}

  // Improved title animation variants
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.175, 0.885, 0.32, 1.275], // Bounce effect
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const titleChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Improved carousel animation
  const getCarouselItemStyles = (index) => {
    // Calculate position in carousel
    const distance = (index - activeIndex + initiatives.length) % initiatives.length
    const normalizedDistance = distance > initiatives.length / 2 ? distance - initiatives.length : distance

    // Calculate transform values based on position
    const xPosition = normalizedDistance * 300
    const zPosition = Math.abs(normalizedDistance) * -200
    const isActive = index === activeIndex

    return {
      x: xPosition,
      z: zPosition,
      opacity: isActive ? 1 : Math.max(0.5, 1 - Math.abs(normalizedDistance) * 0.3),
      scale: isActive ? 1 : Math.max(0.8, 1 - Math.abs(normalizedDistance) * 0.1),
      rotateY: normalizedDistance * 5, // Slight rotation for 3D effect
      transformStyle: "preserve-3d",
      zIndex: initiatives.length - Math.abs(normalizedDistance),
    }
  }

  return (
    <section className="relative pb-20 overflow-hidden bg-black" ref={ref} id="intiatives">
      <StaticTechBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with improved animation */}
        <motion.div className="text-center mb-16" initial="hidden" animate={controls} variants={titleVariants}>
          <motion.div className="inline-block relative" variants={titleChildVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-mono tracking-tight mt-10">
              Our <span className="text-[#FF69B4]">Initiatives</span>
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-[#007BFF]"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm" variants={titleChildVariants}>
            Pioneering the future through technology and innovation
          </motion.p>
        </motion.div>

        {/* 3D Carousel with improved animations */}
        <div className="relative">
          <div className="flex justify-center items-center">
            <motion.button
              className="absolute left-4 md:left-10 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-[#007BFF] transition-colors border border-[#007BFF]/30"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                style={{ border: "1px solid #007BFF" }}
              />
            </motion.button>

            <div className="overflow-hidden w-full">
              <div className="flex justify-center items-center py-10">
                <div className="relative h-[350px] w-full flex justify-center items-center perspective-[1000px]">
                  <AnimatePresence>
                    {initiatives.map((initiative, index) => (
                      <motion.div
                        key={initiative.id}
                        className="absolute"
                        initial={false}
                        animate={getCarouselItemStyles(index)}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for smoother motion
                          opacity: { duration: 0.4 },
                        }}
                      >
                        <InitiativeCard
                          initiative={initiative}
                          isActive={index === activeIndex}
                          onClick={() => handleCardClick(index)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <motion.button
              className="absolute right-4 md:right-10 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-[#FF69B4] transition-colors border border-[#FF69B4]/30"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 105, 180, 0.5)",
                backgroundColor: "rgba(255, 105, 180, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                style={{ border: "1px solid #FF69B4" }}
              />
            </motion.button>
          </div>

          {/* Carousel indicators with improved animation */}
          <div className="flex justify-center mt-8 space-x-3">
            {initiatives.map((_, index) => (
              <motion.button
                key={index}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setAutoPlay(false)
                  setActiveIndex(index)
                }}
              >
                <div className={`w-8 h-1 rounded-sm ${index === activeIndex ? "bg-[#FF69B4]" : "bg-gray-700"}`} />
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 bg-[#FF69B4] rounded-sm"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{ boxShadow: "0 0 8px rgba(255, 105, 180, 0.7)" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}