import React from 'react';

const MapComponent = () => {
  return (
    <div className="bg-gray-100 rounded-lg h-[400px] w-[369px] overflow-hidden relative">
      {/* Simple map placeholder with light theme styling */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
        {/* Map grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Simulated map markers */}
        <div className="absolute top-4 left-6 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-blue-500 rounded-full shadow-lg"></div>
        <div className="absolute bottom-6 left-12 w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
        
        {/* Map text overlay */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
          Map View
        </div>
      </div>
    </div>
  );
};

export default MapComponent;