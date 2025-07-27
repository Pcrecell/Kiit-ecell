import React, { useState } from "react";

const TeamTabs = ({ teamCategories, activeTeamCategory, setActiveTeamCategory }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [lockedCategory, setLockedCategory] = useState("TEAM LEADS");

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
    setActiveTeamCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setActiveTeamCategory(lockedCategory || "TEAM LEADS");
  };

  const handleClick = (category) => {
    setLockedCategory(category);
    setActiveTeamCategory(category);
  };

  return (
    <>
      <style>{`
        .teamtabs-container {
          position: relative;
          overflow: hidden;
          background: #000000;
          height: 50px;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: nowrap;
          padding: 0 1rem;
        }

        .tab-button {
          background: #686868;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 1rem 1rem 0 0;
          font-weight: 500;
          cursor: pointer;
          transform: translateY(80%);
          opacity: 0.6;
          transition: transform 0.4s ease, opacity 0.4s ease, scale 0.3s ease, flex-grow 0.3s ease; /* Added flex-grow to transition */
          position: relative;
          user-select: none;
        }

        .tab-button.active,
        .tab-button:hover {
          transform: translateY(0);
          opacity: 1;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .teamtabs-container {
            gap: 0.4rem;
            padding: 0 0.4rem;
          }

          .tab-button {
            padding: 0.75rem 0.5rem;
            font-size: 0.875rem;
            flex-grow: 1;
            flex-basis: 0;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .tab-button.active {
            flex-grow: 2;
          }
        }
      `}</style>

      <div className="teamtabs-container" onMouseLeave={handleMouseLeave}>
        {teamCategories.map((category) => (
          <button
            key={category}
            className={`tab-button ${
              activeTeamCategory === category ? "active" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(category)}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default TeamTabs;