import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const { loading, error } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PassHashed: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.FirstName || !userData.Email || !userData.PassHashed) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await dispatch(signup(userData)).unwrap(); // unwrap() to handle payload properly
      if (res?.user) {
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      className={`min-h-[85vh] flex items-center justify-center transition-all duration-300 ${
        theme === "dark" ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
      }`}
    >
      <div className={`p-8 rounded-lg shadow-lg w-96 ${theme === "dark" ? "bg-darkCard" : "bg-lightCard"}`}>
        <h2 className="text-2xl font-bold text-center mb-4">🚀 Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="FirstName"
            placeholder="Enter your First Name"
            value={userData.FirstName}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />
          <input
            type="text"
            name="LastName"
            placeholder="Enter your Last Name"
            value={userData.LastName}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />

          <input
            type="email"
            name="Email"
            placeholder="Enter your Email"
            value={userData.Email}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />

          <input
            type="password"
            name="PassHashed"
            placeholder="Create a Password"
            value={userData.PassHashed}
            onChange={handleChange}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-darkBg border-darkSubText text-darkText focus:ring-darkPrimary"
                : "bg-lightBg border-lightSubText text-lightText focus:ring-lightPrimary"
            }`}
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold transition-all ${
              theme === "dark"
                ? "bg-darkPrimary text-darkBg hover:bg-darkSecondary"
                : "bg-lightPrimary text-lightBg hover:bg-lightSecondary"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center  mt-4">
          Already have an account?{" "}
          <a href="/login" className={`font-bold ${theme === "dark" ? "text-darkPrimary" : "text-lightPrimary"}`}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
