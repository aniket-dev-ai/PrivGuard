import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Menu & Close Icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const bgColor = theme === "dark" ? "bg-darkBg" : "bg-lightBg";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const hoverBg = theme === "dark" ? "hover:bg-darkCard" : "hover:bg-lightCard";
  const borderColor =
    theme === "dark" ? "border-darkSubText" : "border-lightSubText";

  return (
    <>
      {/* Menu Button (Fixed) */}
      <button
        className={`fixed top-4 left-4 z-40 bg-transparent ${
          theme === "dark" ? "text-darkText" : "text-lightText"
        } p-3 rounded-md shadow-inner z-50 transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${bgColor} ${textColor} shadow-xl border-r ${borderColor} p-5 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {/* <FiX size={24} onClick={() => setIsOpen(!isOpen)} /> */}
          🚀 PrivGuard
        </h2>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/"
            className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            🏠 Home
          </Link>
          <Link
            to="/login"
            className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            🔗 Login
          </Link>
          <Link
            to="/fake-data"
            className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            🕵️ Fake Data
          </Link>
          <Link
            to="/Signup"
            className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            🔍 Sign-in
          </Link>
          <Link
            to="/settings"
            className={`block p-3 rounded-md transition-all ${hoverBg} flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      {/* Background Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
