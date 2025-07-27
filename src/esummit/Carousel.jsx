import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.css";
import img1 from "../assets/png/dribble-removebg-preview.png";
import img2 from "../assets/png/images-removebg-preview.png";
import img3 from "../assets/png/images-removebg-preview (3).png";
import { Skeleton } from '@mui/material';



const Carousel = ({
    images = [img1, img2, img3],
    displayTime = 2000,
    transitionTime = 300,
    rewindSpeed = 70,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRewinding, setIsRewinding] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(Array(images.length).fill(false));
    const [imgErrored, setImgErrored] = useState(Array(images.length).fill(false));

    useEffect(() => {
        if (isRewinding) {
            const rewindTimer = setTimeout(() => {
                if (currentIndex > 0) {
                    setCurrentIndex((prevIndex) => prevIndex - 1);
                } else {
                    setIsRewinding(false);
                }
            }, rewindSpeed);
            return () => clearTimeout(rewindTimer);
        }

        const timer = setTimeout(() => {
            if (currentIndex === images.length - 1) {
                setIsRewinding(true);
            } else {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        }, displayTime);

        return () => clearTimeout(timer);
    }, [currentIndex, displayTime, images.length, isRewinding, rewindSpeed]);

    return (
        <div className="carousel-container ">
            <AnimatePresence>
                {images.map((image, index) =>
                    index === currentIndex ? (
                        <motion.div
                            key={index}
                            className="carousel-slide"
                            initial={{ x: isRewinding ? "-100%" : "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: isRewinding ? "100%" : "-100%" }}
                            transition={{ duration: transitionTime / 1000 }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                              {(!imgLoaded[index] && !imgErrored[index]) && (
                                <Skeleton
                                  variant="rectangular"
                                  animation="pulse"
                                  width="100%"
                                  height={300}
                                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                                />
                              )}
                              <img
                                src={image}
                                alt={`Slide ${index}`}
                                className={`carousel-image transition-opacity duration-700 ${imgLoaded[index] ? 'opacity-100' : 'opacity-0'} ${imgErrored[index] ? 'hidden' : ''}`}
                                onLoad={() => setImgLoaded(prev => { const arr = [...prev]; arr[index] = true; return arr; })}
                                onError={() => setImgErrored(prev => { const arr = [...prev]; arr[index] = true; return arr; })}
                                style={{ position: 'relative', zIndex: 1 }}
                                draggable={false}
                              />
                              {imgErrored[index] && (
                                <Skeleton
                                  variant="rectangular"
                                  animation="pulse"
                                  width="100%"
                                  height={300}
                                />
                              )}
                            </div>
                        </motion.div>
                    ) : null
                )}
            </AnimatePresence>
        </div>
    );
};

export default Carousel;