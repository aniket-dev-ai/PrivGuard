import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Slice/ThemeSlice";
import { FiBell, FiSun, FiMoon, FiUser } from "react-icons/fi";
import ThemeToggle from "../Theme/THemeToggle";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 shadow-md ${
        theme === "dark"
          ? "bg-darkBg text-darkText"
          : "bg-lightBg text-lightText"
      }`}
    >
      {/* Left Side - Logo */}
      <h1 className="text-xl font-bold ml-12"> PrivGuard</h1>

      {/* Right Side - Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-darkCard hover:text-lightBg">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Theme Toggle */}
        <button>
          <ThemeToggle />
        </button>

        {/* User Profile */}
        <button className="p-2 rounded-full hover:bg-darkCard hover:text-lightBg">
          {user ? <FiUser size={20} /> : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
