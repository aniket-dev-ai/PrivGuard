import { useDispatch, useSelector } from "react-redux"; 
import { toggleTheme } from "../Redux/SLice/ThemeSLice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // FIX: Access `theme` property

  return (
    <div
      className={`w-16 h-8 flex m-3 items-center p-1 rounded-full cursor-pointer transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 shadow-inner shadow-slate-500 " : "bg-gray-300 shadow-inner shadow-gray-800"
      }`}
      onClick={() => dispatch(toggleTheme())}
    >
      <div
        className={`w-6 h-6 rounded-full  shadow-md transform transition-all duration-300 ${
          theme === "dark" ? "translate-x-8 bg-darkCard" : "translate-x-0 bg-white"
        }`}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </div>
    </div>
  );
};

export default ThemeToggle;
