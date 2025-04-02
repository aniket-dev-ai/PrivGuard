import { useSelector } from "react-redux";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi"; // Trash Icon for Dismiss

const RecentActivity = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [logs, setLogs] = useState([
    { id: 1, message: "🔴 3 new breaches detected!", time: "2 mins ago" },
    { id: 2, message: "🟡 Your email was found in a leaked database!", time: "10 mins ago" },
    { id: 3, message: "🟢 You saved a fake credit card entry.", time: "20 mins ago" },
    { id: 4, message: "🛑 Your password is weak, consider updating it.", time: "30 mins ago" },
  ]);

  // Function to remove log
  const removeLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  // Theme colors
  const bgColor = theme === "dark" ? "bg-darkCard" : "bg-lightCard";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const borderColor = theme === "dark" ? "border-darkSubText" : "border-lightSubText";

  return (
    <div className={`p-5 ${bgColor}  rounded-lg shadow-lg transition-all`}>
      <h2 className={`text-lg font-semibold ${textColor} mb-4`}>🕒 Recent Activity</h2>

      {logs.length === 0 ? (
        <p className={`text-sm ${textColor} opacity-75`}>No recent activity!</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-center justify-between border-b ${borderColor} pb-2`}
            >
              <div>
                <p className={`${textColor} text-sm`}>{log.message}</p>
                <span className="text-xs text-gray-400">{log.time}</span>
              </div>
              <button
                onClick={() => removeLog(log.id)}
                className="text-gray-500 hover:text-red-500 transition-all"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
