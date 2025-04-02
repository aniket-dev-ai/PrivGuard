import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Menu & Close Icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const bgColor = theme === "dark" ? "bg-darkBg bg-opacity-80 backdrop-blur-lg" : "bg-lightBg bg-opacity-80 backdrop-blur-lg";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const hoverBg = theme === "dark" ? "hover:bg-darkCard" : "hover:bg-lightCard";
  const borderColor = theme === "dark" ? "border-darkSubText" : "border-lightSubText";

  return (
    <>
      {/* Menu Button (Fixed for All Screens) */}
      <button
        className={`fixed top-4 left-4 z-50 bg-transparent text-${
            theme === "dark" ? "darkText shadow-slate-400" : "lightText shadow-black"
            } p-3 rounded-md   shadow-inner transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX  size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${bgColor} ${textColor} shadow-xl border-r ${borderColor} p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🚀 PrivGuard
        </h2>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link to="/" className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}>
            🏠 Home
          </Link>
          <Link to="/shared-data" className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}>
            🔗 Shared Data
          </Link>
          <Link to="/fake-data" className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}>
            🕵️ Fake Data
          </Link>
          <Link to="/breach-check" className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}>
            🔍 Breach Check
          </Link>
          <Link to="/settings" className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}>
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      {/* Background Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-0 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
