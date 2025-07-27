import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import "./fullPage.css"; 

const FullPageScroll = forwardRef(({ 
  children, 
  onExitTop, 
  onExitBottom, 
  isActive = true,
  startIndex = 0 
}, ref) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollToSection = useCallback((index, direction = 'none') => {
    const container = containerRef.current;
    if (!container) return;
    
    setIsTransitioning(true);
    
    // Add transition class for smooth animations
    container.classList.add('transitioning');
    
    // Apply direction-based animation classes
    const sections = container.querySelectorAll('.fullpage-section');
    sections.forEach((section, i) => {
      section.classList.remove('active', 'slide-up', 'slide-down');
      
      if (i === index) {
        section.classList.add('active');
      } else if (direction === 'up' && i < index) {
        section.classList.add('slide-up');
      } else if (direction === 'down' && i > index) {
        section.classList.add('slide-down');
      }
    });
    
    // Remove transition class after animation
    setTimeout(() => {
      container.classList.remove('transitioning');
      setIsTransitioning(false);
    }, 600);
  }, []);

  const handleWheel = useCallback((e) => {
    if (!isActive || isScrolling || isTransitioning) return;

    e.preventDefault();
    setIsScrolling(true);

    const direction = e.deltaY > 0 ? 1 : -1;
    const totalSections = React.Children.count(children);

    // Check if trying to scroll up from first section - allow normal behavior
    if (currentIndex === 0 && direction < 0) {
      if (onExitTop) {
        // Add exit animation
        const container = containerRef.current;
        if (container) {
          container.classList.add('exiting');
          container.classList.remove('active');
        }
        setTimeout(() => {
          onExitTop();
        }, 300);
      }
      setTimeout(() => setIsScrolling(false), 800);
      return;
    }

    // Check if trying to scroll down from last section - allow normal behavior
    if (currentIndex === totalSections - 1 && direction > 0) {
      if (onExitBottom) {
        // Add exit animation
        const container = containerRef.current;
        if (container) {
          container.classList.add('exiting');
          container.classList.remove('active');
        }
        setTimeout(() => {
          onExitBottom();
        }, 300);
      }
      setTimeout(() => setIsScrolling(false), 800);
      return;
    }

    // Normal section navigation with smooth transitions
    const nextIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      totalSections - 1
    );

    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
      scrollToSection(nextIndex, direction > 0 ? 'down' : 'up');
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  }, [currentIndex, isScrolling, isTransitioning, isActive, children, onExitTop, onExitBottom, scrollToSection]);

  // Update current index when startIndex changes
  useEffect(() => {
    if (startIndex !== currentIndex) {
      setCurrentIndex(startIndex);
    }
    
    // Add entrance animation when component mounts
    const container = containerRef.current;
    if (container) {
      // Add active class for fade-in effect
      setTimeout(() => {
        container.classList.add('active', 'entering');
        setTimeout(() => {
          container.classList.remove('entering');
        }, 600);
      }, 50);
      
      // Scroll to the correct section
      setTimeout(() => {
        scrollToSection(startIndex);
      }, 100);
    }
  }, [startIndex, scrollToSection, currentIndex]);

  // Event listener setup
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Add event listener with a delay to ensure DOM is ready
    const setupListener = () => {
      if (container && container.addEventListener) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }
    };

    const timeoutId = setTimeout(setupListener, 50);

    return () => {
      clearTimeout(timeoutId);
      if (container && container.removeEventListener) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel, isActive]);

  // Navigate to specific section (exposed method)
  const goToSection = useCallback((index) => {
    const totalSections = React.Children.count(children);
    const validIndex = Math.min(Math.max(index, 0), totalSections - 1);
    const direction = validIndex > currentIndex ? 'down' : 'up';
    setCurrentIndex(validIndex);
    scrollToSection(validIndex, direction);
  }, [children, currentIndex, scrollToSection]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    goToSection,
    getCurrentIndex: () => currentIndex,
    getTotalSections: () => React.Children.count(children)
  }), [goToSection, currentIndex, children]);

  // Don't render if not active
  if (!isActive) {
    return null;
  }

  return (
    <div className="fullpage-container" ref={containerRef}>
      {React.Children.map(children, (child, index) => (
        <div 
          key={index}
          className={`fullpage-section ${index === currentIndex ? 'active' : ''}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
});

// Set display name for debugging
FullPageScroll.displayName = 'FullPageScroll';

export default FullPageScroll;
