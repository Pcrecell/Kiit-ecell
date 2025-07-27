"use client"

import { useState } from "react"
import { cn } from "../../esummit/lib/utils"

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param {Object} props
 * @param {number} [props.width]
 * @param {number} [props.height]
 * @param {[number, number]} [props.squares]
 * @param {string} [props.className]
 * @param {string} [props.squaresClassName]
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [48, 48],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState(null)

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 min-h-screen w-full border border-gray-400/30", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/20 transition-all blur-[0.75px] duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index ? "fill-white" : "fill-[black]/30",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}

export default InteractiveGridPattern;