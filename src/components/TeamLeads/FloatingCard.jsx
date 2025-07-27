import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import TooltipPortal from "./TooltipPortal";

const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

// Add 'designation' to the destructured props
const FloatingCard = ({ domain, teamLeadName, designation, position }) => {
    const cardRef = useRef();
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const [isFloating, setIsFloating] = useState(true); // New state to control animation status

    const controls = useAnimation();
    const intervalIdRef = useRef(null); // Renamed for clarity, stores the interval ID

    // Function to perform one animation step
    const performAnimation = async () => {
        const newX = getRandomFloat(-50, 50);
        const newY = getRandomFloat(-50, 50);
        await controls.start({
            x: newX,
            y: newY,
            transition: {
                duration: 4, // Animation duration
                ease: "easeInOut",
            }
        });
    };

    // useEffect to manage the continuous floating animation
    useEffect(() => {
        // Only run if isFloating is true
        if (isFloating) {
            // Clear any existing interval to prevent duplicates before starting a new one
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }

            // Start the first animation immediately
            performAnimation();

            // Set up an interval for subsequent animations
            intervalIdRef.current = setInterval(() => {
                performAnimation();
            }, 4000); // Trigger a new animation every 4 seconds
        } else {
            // If not floating, clear the interval and stop the current animation
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null; // Reset the ref to null after clearing
            }
            controls.stop(); // Freeze the card at its current position
        }

        // Cleanup function: This runs when the component unmounts or when isFloating changes
        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isFloating, controls]); // Re-run effect when isFloating or controls change

    const handleMouseEnter = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setTooltipPos({
                top: rect.bottom + 12, // Position below the card
                left: rect.left + rect.width / 2 // Center horizontally
            });
        }
        setShowTooltip(true);
        setIsFloating(false); // Stop the floating animation
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
        setIsFloating(true); // Resume the floating animation
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="absolute"
                style={{ ...position, zIndex: 20 }}
                animate={controls} // framer-motion will control x,y based on 'controls'
            >
                <motion.div
                    className="w-[200px] px-6 py-4 bg-black/30 backdrop-blur-md text-white rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {domain}
                </motion.div>
            </motion.div>

            {showTooltip && (
                <TooltipPortal>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute z-[9999] w-[300px] h-[250px] p-4 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg flex flex-col items-center gap-4 border border-white/20"
                        style={{
                            position: "fixed",
                            top: tooltipPos.top,
                            left: tooltipPos.left,
                            transform: "translateX(-50%)"
                        }}
                    >
                        <div className="text-center">
                            <h2 className="text-lg font-bold">{teamLeadName}</h2>
                        </div>

                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg" // Placeholder image
                            alt={`${teamLeadName}`}
                            className="w-40 h-40 rounded-full object-cover"
                        />
                        {/* Displaying the designation below the image */}
                        {designation && (
                            <p className="text-base text-gray-300 mt-2">{designation}</p>
                        )}
                    </motion.div>
                </TooltipPortal>
            )}
        </>
    );
};

export default FloatingCard;