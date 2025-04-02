import { FiDatabase, FiShieldOff, FiUserCheck, FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";

const StatsCards = () => {
  const theme = useSelector((state) => state.theme.theme);

  const stats = [
    {
      title: "Total Shared Data",
      value: "152 Files",
      icon: <FiDatabase size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Active Breaches",
      value: "3 Detected",
      icon: <FiShieldOff size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Saved Fake Data",
      value: "48 Entries",
      icon: <FiUserCheck size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Security Score",
      value: "82%",
      icon: <FiLock size={28} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 max-w-full sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`p-4 flex items-center space-x-4 rounded-lg shadow-md ${
            theme === "dark" ? "bg-darkCard text-darkText" : "bg-lightCard text-lightText"
          } hover:scale-105 transition-transform cursor-pointer`}
        >
          <div
            className={`${item.color} text-white p-3 rounded-full shadow-lg`}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-sm opacity-80">{item.title}</p>
            <h2 className="text-lg font-bold">{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
