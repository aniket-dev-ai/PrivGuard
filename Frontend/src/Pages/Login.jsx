import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    Email: "",
    PassHashed: "",
  });

  // ✅ Efficient state update
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.Email || !credentials.PassHashed) {
      alert("Please fill all fields");
      return;
    }

    const res = await dispatch(login(credentials));
    if (res.payload?.user) {
      navigate("/"); // ✅ Redirect after login success
    }
  };

  return (
    <div
      className={`min-h-[85vh] flex items-center justify-center transition-all duration-300 ${
        theme === "dark" ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      <div className={`p-8 rounded-lg shadow-lg w-96 ${theme === "dark" ? "bg-darkCard" : "bg-lightCard"}`}>
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="Email" // ✅ Fixed name prop
            placeholder="Enter your Email"
            value={credentials.Email}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />

          {/* Password */}
          <input
            type="password"
            name="PassHashed" // ✅ Fixed name prop
            placeholder="Enter your Password"
            value={credentials.PassHashed}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold transition-all ${
              theme === "dark"
                ? "bg-darkPrimary text-darkBg hover:bg-darkSecondary"
                : "bg-lightPrimary text-lightBg hover:bg-lightSecondary"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className={`font-bold ${theme === "dark" ? "text-darkPrimary" : "text-lightPrimary"}`}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
