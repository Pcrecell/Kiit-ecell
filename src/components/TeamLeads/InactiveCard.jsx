import React from "react";
import "./InactiveCard.css";

const InactiveCard = ({
  avatarUrl = "<Placeholder for avatar URL>",
  name = "Javi A. Torres",
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`inactive-card-simple ${className}`.trim()}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        className="inactive-card-avatar"
        src={avatarUrl}
        alt={`${name || "User"} avatar`}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <div className="inactive-card-name">{name}</div>
    </div>
  );
};

export default React.memo(InactiveCard);
