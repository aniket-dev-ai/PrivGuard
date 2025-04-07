import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const theme = useSelector((state) => state.theme.theme);

  // Theme colors
  const bgColor = theme === "dark" ? "bg-darkCard  " : "bg-lightCard";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const borderColor =
    theme === "dark" ? "border-darkSubText" : "border-lightSubText";
  const hoverColor =
    theme === "dark" ? "hover:bg-darkSecondary" : "hover:bg-lightSecondary";

  const actions = [
    {
      label: "⚡ Fake Data Generator", 
      to:"fake-data"
    },
    {
      label: "🔍 Breach Check", 
      to:"breach-check"
    },
    {
      label: "🗑️ Clear Tracking Data", 
      to:"clear-tracking"
    },
    {
      label: "🔑 Password Strength Test", 
      to:"password-strength"
    },
  ];

  return (
    <div className={`p-5 ${bgColor} rounded-lg shadow-lg transition-all`}>
      <h2 className={`text-lg font-semibold ${textColor} mb-4`}>
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link 
          key={index}
            to={action.to} 
            className={`p-4 rounded-lg shadow-inner border ${borderColor} ${bgColor} shadow-md flex flex-col items-center justify-center text-center gap-2 ${textColor} transition-all duration-300 transform hover:scale-105 ${hoverColor}`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
