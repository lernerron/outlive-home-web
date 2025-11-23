import React from "react";

export default function Logo({ className = "h-12" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      className={className}
    >
      {/* Mountain shape */}
      <path
        d="M20 40 L40 10 L60 40 Z"  // Left mountain
        fill="#1E3A8A"  // Blue-900
        stroke="none"
      />
      <path
        d="M45 40 L65 15 L85 40 Z"  // Right mountain
        fill="#2563EB"  // Blue-600
        stroke="none"
      />
    </svg>
  );
}