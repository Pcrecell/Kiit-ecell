import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import PolaroidImages from "./PolaroidImages";

const eventColors = {
  'hult-prize': '#ff0ee0',  
  'esummit': '#FD5B2A',     
  'build-school': '#0f75e3', 
  'maverick': '#F24D51',     
  'i-camp': '#23A7DC', 
  'ecell-life': 'white',
};


const eventPaths = {
  'hult-prize': 'hult-prize',
  'esummit': 'esummit',
  'build-school': 'build-school',
  'maverick': 'maverick',
  'i-camp': 'i-camp',
  'ecell-life': 'life-at-ecell',
};

export default function BentoGrid() {
  const navigate = useNavigate();
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleMouseEnter = (eventName) => {
    setHoveredEvent(eventName);
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  const handleEventClick = (eventName) => {
    const path = eventPaths[eventName];
    if (path) {
      navigate(path);
    }
  };

  const getImageClass = (eventName) => {
    if (hoveredEvent === null) return ""; 
    if (hoveredEvent === eventName) return ""; 
    return "grayscale opacity-50"; 
  };

  const getDivClass = (eventName) => {
    if (hoveredEvent === null) return ""; 
    if (hoveredEvent === eventName) return ""; 
    return "grayscale opacity-50"; 
  };

  // Special function for ecell-life logo border visibility
  const getEcellLogoBorderClass = () => {
    // Hide borders when hovering over any ecell-life event
    if (hoveredEvent === 'ecell-life') {
      return '';
    }
    // Show borders when not hovering over ecell-life
    return 'border-b-white border-b-2 border-l-2 border-l-white';
  };

  // Helper to render image with skeleton
  const renderImageWithSkeleton = (src, className, style = {}, alt = "") => (
    <div className="relative w-full h-full">
      {!loadedImages[src] && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          className="w-full h-full rounded-xl absolute top-0 left-0"
          sx={{ borderRadius: 2, zIndex: 10, position: 'absolute', top: 0, left: 0 }}
          animation="pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages[src] ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        style={{ ...style, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onLoad={() => setLoadedImages(prev => ({ ...prev, [src]: true }))}
      />
    </div>
  );

  // SVG paths for each event group's border
  const getEventBorderPath = (eventName) => {
    const cellW = 100 / 12; // 8.333% per column
    const cellH = 100 / 22; // 7.143% per row
    
    switch (eventName) {

      case 'hult-prize': {
        // Rectangle: 12 columns x 3 rows, rounded top left and top right
        const r = 2;
        return `M ${r} 0
                L ${cellW * 12 - r} 0
                A ${r} ${r} 0 0 1 ${cellW * 12} ${r}
                L ${cellW * 12} ${cellH * 2}
                L ${cellW * 4} ${cellH * 2}
                L ${cellW * 4} ${cellH * 3}
                L 0 ${cellH * 3}
                L 0 ${r}
                A ${r} ${r} 0 0 1 ${r} 0
                Z`;
      }
      
      case 'esummit':
        // L-shape: 4 cols x 3 rows + 8 cols x 3 rows
        return `M ${cellW * 4} ${cellH * 2}
                L ${cellW * 12} ${cellH * 2} 
                L ${cellW * 12} ${cellH * 8} 
                L ${cellW * 4} ${cellH * 8} 
                Z`;
      
      case 'build-school':
        // Complex L-shape: starts at col 4, various heights
        return `M 0 ${cellH * 3}
                L ${cellW * 4} ${cellH * 3} 
                L ${cellW * 4} ${cellH * 10} 
                L 0 ${cellH * 10} 
                Z`;
      
      case 'maverick': {
        // Rectangle bottom section: 8 cols x 5 rows, rounded bottom right
        return `M ${cellW * 4} ${cellH * 8}
                L ${cellW * 12} ${cellH * 8}
                L ${cellW * 12} ${cellH * 11}
                L ${cellW * 12} ${cellH * 14}
                L ${cellW * 8} ${cellH * 14}
                L ${cellW * 8} ${cellH * 11}
                L ${cellW * 4} ${cellH * 11}
                Z`;
      }
      
      case 'i-camp': {
        // Rectangle: 4 cols x 3 rows (right side), rounded bottom left
        return `M 0 ${cellH * 10}
                L ${cellW * 4} ${cellH * 10}
                L ${cellW * 4} ${cellH * 11}
                L ${cellW * 8} ${cellH * 11}
                L ${cellW * 8} ${cellH * 14}
                L 0 ${cellH * 14}
                Z`;
      }

      case 'ecell-life': {
        // Rectangle: 4 cols x 3 rows (right side), rounded bottom left
        const r = 2;
        return `M 0 ${cellH * 14}
                L ${cellW * 12} ${cellH * 14} 
                L ${cellW * 12} ${cellH * 20 - r}
                A ${r} ${r} 0 0 1 ${cellW * 12 - r} ${cellH * 20}
                L ${r} ${cellH * 20}
                A ${r} ${r} 0 0 1 0 ${cellH * 20 - r}
                L 0 ${cellH * 14}
                Z`;
      }
      
      default:
        return '';
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full bg-[black] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PolaroidImages />
        {/* Black blurred corners */}
        <div className="absolute top-[-10vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
        <div className="absolute top-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-10vw] left-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-10vw] right-[-10vw] w-[30vw] h-[50vw] rounded-full bg-black opacity-60 blur-[120px]" />

        {/* Glowy Stars */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
          <div className="absolute top-[10%] left-[5%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-300">
            ✦
          </div>
          <div className="absolute top-[2%] left-[95%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-800">
            ✦
          </div>
          <div className="absolute top-[8270-%] left-[4%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-400">
            ✦
          </div>
          <div className="absolute top-[90%] left-[93%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-900">
            ✦
          </div>
          <div className="absolute top-[40%] left-[3%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-200">
            ✦
          </div>
          <div className="absolute top-[55%] left-[96%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-600">
            ✦
          </div>
          <div className="absolute top-[32%] left-[91%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-1100">
            ✦
          </div>
          <div className="absolute top-[65%] left-[7%] text-white text-xl md:text-3xl lg:text-3xl opacity-90 blur-[1px] animate-pulse delay-500">
            ✦
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[90vh]">
        {/* <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-10">Our Events</h1> */}

        <div className="relative grid grid-cols-12 grid-rows-[repeat(22,_minmax(0,_1fr))] gap-2 sm:gap-3 sm:w-full md:w-[75%] h-[1100px] md:h-[1900px] bg-none p-2 rounded-lg">
          
          {/* SVG Border Overlays - Fixed positioning and transitions */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor={eventColors[hoveredEvent] || 'white'} floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={eventColors[hoveredEvent] || 'white'} floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Render borders for each event - only show the hovered one */}
            {Object.keys(eventColors).map((eventName) => (
              <path
                key={eventName}
                d={getEventBorderPath(eventName)}
                fill="none"
                stroke={eventColors[eventName]}
                strokeWidth="2"
                filter="url(#glow)"
                vectorEffect="non-scaling-stroke"
                opacity={hoveredEvent === eventName ? 1 : 0}
                className="transition-opacity duration-300 ease-in-out"
                style={{ 
                  transform: 'none',
                  transformOrigin: 'center'
                }}
              />
            ))}
          </svg>

          {/* Hult Prize */}
          <div 
            className={`bg-[radial-gradient(circle_at_center,_#58004D_10%,_#ff0ee0_100%)] rounded-tl-2xl col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('hult-prize')}`}
            onMouseEnter={() => handleMouseEnter('hult-prize')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('hult-prize')}
          >
            <img 
              src="https://i.postimg.cc/wx0cmTLV/Hult-Prize-Logo-For-Dark-Backgrounds-1.png" 
              alt="" 
              className={`w-full h-full object-contain scale-75 transition-all duration-300 ${getImageClass('hult-prize')}`}
            />
          </div>
          {/* Hult Prize */}
          <div 
            className={`bg-none col-span-2 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('hult-prize')}`}
            onMouseEnter={() => handleMouseEnter('hult-prize')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('hult-prize')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/43HHmXZW/DSC05952-1.png",
              `object-cover transition-all duration-300 ${getImageClass('hult-prize')}`
            )}
          </div>
          {/* Hult Prize */}
          <div 
            className={`bg-none rounded-tr-2xl col-span-6 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('hult-prize')}`}
            onMouseEnter={() => handleMouseEnter('hult-prize')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('hult-prize')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/1XyFYN9y/02680307967d39bfd4106f50d0247cfb00288b0b.jpg",
              `object-cover object-top rounded-tr-2xl transition-all duration-300 ${getImageClass('hult-prize')}`
            )}
          </div>

          {/* Esummit */}
          <div 
            className={`bg-[radial-gradient(circle_at_center,_#B72A00_10%,_#FD5B2A_100%)] col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('esummit')}`}
            onMouseEnter={() => handleMouseEnter('esummit')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('esummit')}
          >
            <img 
              src="https://i.postimg.cc/sxy6D6Fg/E-Summit-2019-Word-Mark-3.png" 
              alt="" 
              className={`w-full h-full object-contain transition-all duration-300 ${getImageClass('esummit')}`} 
            />
          </div>
          {/* Esummit */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('esummit')}`}
            onMouseEnter={() => handleMouseEnter('esummit')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('esummit')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/vTcJd25x/DSC08640-1.png",
              `object-cover transition-all duration-300 ${getImageClass('esummit')}`
            )}
          </div>

          {/* Build-School */}
          <div 
            className={`bg-none col-span-2 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('build-school')}`}
            onMouseEnter={() => handleMouseEnter('build-school')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('build-school')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/Kvd2mbqG/DSC-0652-1.png",
              `object-cover transition-all duration-300 ${getImageClass('build-school')}`
            )}
          </div>
          {/* Build-School */}
          <div 
            className={`bg-none col-span-2 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('build-school')}`}
            onMouseEnter={() => handleMouseEnter('build-school')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('build-school')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/6QhJVv9q/DSC-0688-1.png",
              `object-cover transition-all duration-300 ${getImageClass('build-school')}`
            )}
          </div>

          {/* Build-School */}   
          <div 
            className={`bg-none col-span-2 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('build-school')}`}
            onMouseEnter={() => handleMouseEnter('build-school')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('build-school')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/yNKCSPC2/DSC-0693-1.png",
              `object-cover transition-all duration-300 ${getImageClass('build-school')}`
            )}
          </div>
          {/* Build-School */}
          <div 
            className={`bg-none col-span-2 row-span-2 cursor-pointer transition-all duration-300 ${getDivClass('build-school')}`}
            onMouseEnter={() => handleMouseEnter('build-school')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('build-school')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/jSPr51mz/DSC-0669-1.png",
              `object-cover transition-all duration-300 ${getImageClass('build-school')}`
            )}
          </div>

          {/* Esummit */}
          <div 
            className={`bg-none col-span-8 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('esummit')}`}
            onMouseEnter={() => handleMouseEnter('esummit')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('esummit')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/NMfhdjM4/DSC08559-1-1.png",
              `object-cover transition-all duration-300 ${getImageClass('esummit')}`
            )}
          </div>
          {/* Build-School */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('build-school')}`}
            onMouseEnter={() => handleMouseEnter('build-school')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('build-school')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/05F8G5fD/Group-5.png",
              `object-cover transition-all duration-300 ${getImageClass('build-school')}`
            )}
          </div>

          {/* Maverick */}
          <div 
            className={`bg-[radial-gradient(circle_at_center,#3a1810_0%,_#FE591F_100%)] col-span-4 row-span-3 cursor-pointer flex items-center justify-center transition-all duration-300 ${getDivClass('maverick')}`}
            onMouseEnter={() => handleMouseEnter('maverick')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('maverick')}
          >
              <img src="https://i.postimg.cc/Zn5JFfTR/Whats-App-Image-2025-07-09-at-00-26-43-39581389-removebg-preview.png" alt="" className="w-[70%] h-[70%] object-contain " />
          </div>
          {/* Maverick */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('maverick')}`}
            onMouseEnter={() => handleMouseEnter('maverick')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('maverick')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/VvhcrPzF/D24-0108-1.png",
              `object-cover transition-all duration-300 ${getImageClass('maverick')}`
            )}
          </div>

          {/* I-Camp */}
          <div 
            className={`bg-[radial-gradient(circle_at_center,_#D9D9D9_10%,_#23A7DC_100%)] col-span-4 row-span-1 cursor-pointer transition-all duration-300 ${getDivClass('i-camp')}`}
            onMouseEnter={() => handleMouseEnter('i-camp')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('i-camp')}
          >
            <img 
              src="https://i.postimg.cc/yxPfJmBX/Icamp-logo-1.png" 
              alt="" 
              className={`w-[90%] h-[90%] mx-auto object-contain transition-all duration-300 ${getImageClass('i-camp')}`}
            />
          </div>
          {/* I-Camp */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('i-camp')}`}
            onMouseEnter={() => handleMouseEnter('i-camp')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('i-camp')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/Kjj288hz/ADI-2748-1-1.png",
              `object-cover transition-all duration-300 ${getImageClass('i-camp')}`
            )}
          </div>
          {/* I-Camp */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('i-camp')}`}
            onMouseEnter={() => handleMouseEnter('i-camp')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('i-camp')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/DZBhhbDH/ADI-2346-1-1.png",
              `object-cover transition-all duration-300 ${getImageClass('i-camp')}`
            )}
          </div>
          {/* Maverick */}
          <div 
            className={`bg-none col-span-4 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('maverick')}`}
            onMouseEnter={() => handleMouseEnter('maverick')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('maverick')}
          >
            {renderImageWithSkeleton(
              "https://i.postimg.cc/Mpfn5Yyy/16a9022cddb2a6ca3fd4768deb9d5c84e1dd4f90.jpg",
              `object-cover transition-all duration-300 ${getImageClass('maverick')}`
            )}
          </div>


          {/* ecell-life --- 1*/}
          <div 
            className={`bg-none col-span-6 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('ecell-life')}`}
            onMouseEnter={() => handleMouseEnter('ecell-life')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('ecell-life')}
          >
            {renderImageWithSkeleton(
              "https://ik.imagekit.io/ilgcom35w/ecell-life-1.png?updatedAt=1753542373000",
              `object-cover transition-all duration-300 ${getImageClass('ecell-life')}`
            )}
          </div>{/* ecell-life --- 2*/}
          <div 
            className={`bg-none col-span-6 row-span-3 cursor-pointer transition-all duration-300 ${getDivClass('ecell-life')}`}
            onMouseEnter={() => handleMouseEnter('ecell-life')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('ecell-life')}
          >
            {renderImageWithSkeleton(
              "https://ik.imagekit.io/ilgcom35w/ecell-life-2.png?updatedAt=1753542389172",
              `object-cover transition-all duration-300 ${getImageClass('ecell-life')}`
            )}
          </div>     
          {/* ecell-life ----> Main logo*/}  
          <div 

            className={`bg-none col-span-4 row-span-3 cursor-pointer ${getEcellLogoBorderClass()} transition-all rounded-bl-2xl duration-300 ${getDivClass('ecell-life')}`}

            onMouseEnter={() => handleMouseEnter('ecell-life')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('ecell-life')}
          >
            {renderImageWithSkeleton(
              "https://ik.imagekit.io/fhervghik/Group%2011.png",
               `object-cover transition-all duration-300 rounded-bl-2xl ${getImageClass('ecell-life')}`
            )}
          </div>
          {/* ecell-life --- 3*/}
          <div 
            className={`bg-none col-span-8 row-span-3 cursor-pointer transition-all rounded-br-2xl duration-300 ${getDivClass('ecell-life')}`}
            onMouseEnter={() => handleMouseEnter('ecell-life')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEventClick('ecell-life')}
          >
            {renderImageWithSkeleton(
              "https://ik.imagekit.io/ilgcom35w/ecell-life-3.png?updatedAt=1753542401519",
              `object-cover transition-all duration-300 rounded-br-2xl ${getImageClass('ecell-life')}`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}