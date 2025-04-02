import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DataRiskScore = () => {
  const [score, setScore] = useState(0);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const calculatedScore = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => setScore(calculatedScore), 1000);
  }, []);

  // Risk level colors
  let riskColor = "#22C55E"; // Green
  let riskLabel = "🟢 Secure";

  if (score < 50) {
    riskColor = "#EF4444"; // Red
    riskLabel = "🔴 High Risk";
  } else if (score < 80) {
    riskColor = "#FACC15"; // Yellow
    riskLabel = "🟡 Medium Risk";
  }

  // Theme colors
  const bgColor = theme === "dark" ? "bg-darkCard" : "bg-lightCard";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const subTextColor = theme === "dark" ? "text-darkSubText" : "text-lightSubText";

  return (
    <div className={`p-5 ${bgColor} rounded-lg shadow-lg flex flex-col items-center transition-all`}>
      <h2 className={`text-lg font-semibold ${textColor} mb-4`}>🛡️ Data Risk Score</h2>

      {/* Circular Score Indicator */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={theme === "dark" ? "#333" : "#ddd"}
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={riskColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (score / 100) * 251.2} // Dynamic Offset
            strokeLinecap="round"
            transform="rotate(-90 50 50)" // Rotate to start from top
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }} // Smooth Animation
          />
        </svg>
        {/* Score Text */}
        <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${textColor}`}>
          {score}%
        </span>
      </div>

      {/* Risk Label */}
      <p className={`mt-3 font-semibold`} style={{ color: riskColor }}>
        {riskLabel}
      </p>

      {/* Security Tips */}
      <p className={`text-sm text-center mt-2 ${subTextColor}`}>
        {score < 50
          ? "⚠️ High risk! Change your passwords & enable 2FA."
          : score < 80
          ? "🔄 Moderate risk detected. Review your data."
          : "✅ Secure! Keep your data safe."}
      </p>
    </div>
  );
};

export default DataRiskScore;