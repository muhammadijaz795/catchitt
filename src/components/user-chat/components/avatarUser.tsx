import React from "react";
import styles from "./YourComponent.module.css"; // Optional if using CSS Modules

// Utility: map A-Z to fixed colors
const getColorFromLetter = (name: string) => {
  const colors = [
    "#f39c12", "#e74c3c", "#3498db", "#9b59b6", "#1abc9c", "#2ecc71",
    "#e67e22", "#16a085", "#2980b9", "#8e44ad", "#2c3e50", "#d35400",
    "#c0392b", "#7f8c8d", "#27ae60", "#f1c40f", "#34495e", "#1abc9c",
    "#9b59b6", "#e67e22", "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
    "#16a085", "#d35400"
  ];

  const firstLetter = (name?.[0] || "A").toUpperCase();
  const index = firstLetter.charCodeAt(0) - 65;
  return colors[index % colors.length];
};

// Utility: generate SVG image as base64
const generateAvatarImage = (text: string) => {
  const letter = (text?.[0] || "?").toUpperCase();
  const bgColor = getColorFromLetter(text);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100%" height="100%" fill="${bgColor}" />
      <text x="50%" y="50%" dy=".35em" text-anchor="middle" font-size="50" fill="#ffffff" font-family="Arial">
        ${letter}
      </text>
    </svg>
  `;

  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
};

interface AvatarUserProps {
  userName: string;
  useImage?: boolean; // true = use <img>, false = use <div>
}

const AvatarUser: React.FC<AvatarUserProps> = ({ userName, useImage = false }) => {
  const firstLetter = userName?.charAt(0).toUpperCase() || "?";
  const bgColor = getColorFromLetter(userName || "A");

  if (useImage) {
    const imageSrc = generateAvatarImage(userName);
    return (
      <img
        src={imageSrc}
        alt={firstLetter}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      />
    );
  }

  return (
    <div
      className="avatar"
      style={{
        backgroundColor: bgColor,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "20px",
        textTransform: "uppercase",
      }}
    >
      {firstLetter}
    </div>
  );
};

export default AvatarUser;
