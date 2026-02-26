export default function Logo({ className = "h-12", dark = false }) {
  const textColor = dark ? "#1E3A8A" : "#FFFFFF";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      className={className}
      aria-label="Outlive Homes"
    >
      <text
        x="0"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="24"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Outlive Homes
      </text>
    </svg>
  );
}
