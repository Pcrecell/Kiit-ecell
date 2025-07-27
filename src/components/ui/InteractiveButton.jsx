import React, { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Or use `next/link` if you're using Next.js

const InteractiveHoverButton = forwardRef(
  ({ children, className = "", href, ...props }, ref) => {
    const commonClasses =
      "group relative w-auto cursor-pointer bg-black overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold " + className;

    const content = (
      <>
        <div className="flex items-center gap-2 ">
          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]"></div>
          <span className="inline-block transition-all text-white duration-300 group-hover:translate-x-5 group-hover:opacity-0">
            {children}
          </span>
        </div>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
          <span>{children}</span>
          <ArrowRight />
        </div>
      </>
    );

    if (href) {
      return (
        <Link
          ref={ref}
          to={href}
          className={commonClasses}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={commonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

export default InteractiveHoverButton;
