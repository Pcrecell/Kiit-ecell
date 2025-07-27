// shared/KiteBackground.jsx

import React from "react";

const KiteBackground = ({ children }) => {
    return (
        <div className="relative z-0 bg-black">
            {/* Background grid behind */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 w-full h-full"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 75%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 75%, transparent 100%)',
                }}
            >
                {/* Vertical lines */}
                {Array.from({ length: 13 }).map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 border-l border-white/20"
                        style={{ left: `${(i / 12) * 100}%`, opacity: 0.5 }}
                    />
                ))}
                {/* Horizontal lines */}
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 border-t border-white/20"
                        style={{ top: `${(i / 8) * 100}%`, opacity: 0.5 }}
                    />
                ))}
                {/* Diamonds */}
                {[
                    { col: 2, row: 2 },
                    { col: 5, row: 4 },
                    { col: 9, row: 3 },
                    { col: 7, row: 7 },
                    { col: 11, row: 6 },
                    { col: 4, row: 6 },
                    { col: 8, row: 1 },
                    { col: 10, row: 5 },
                    { col: 3, row: 5 },
                ].map(({ col, row }, idx) => (
                    <div
                        key={`diamond-${idx}`}
                        className="absolute bg-white opacity-80 rotate-45"
                        style={{
                            left: `calc(${(col / 12) * 100}% - 0.375rem)`,
                            top: `calc(${(row / 8) * 100}% - 0.375rem)`,
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            zIndex: 0,
                        }}
                    />
                ))}
            </div>

            {/* Foreground content on top */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default KiteBackground;
