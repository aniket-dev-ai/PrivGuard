import { useSelector } from "react-redux";

const ResetPassword = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
      theme === "dark" ? "bg-darkBg text-darkText" : "bg-lightBg text-lightText"
    }`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 ${
        theme === "dark" ? "bg-darkCard" : "bg-lightCard"
      }`}>
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        <p className="text-center mb-4">Enter your registered email to receive reset instructions.</p>

        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full p-3 rounded-md border ${
            theme === "dark" ? "bg-darkBg border-darkSubText text-darkText" : "bg-lightBg border-lightSubText text-lightText"
          } focus:outline-none focus:ring-2 ${
            theme === "dark" ? "focus:ring-darkPrimary" : "focus:ring-lightPrimary"
          }`}
        />

        <button className={`w-full mt-6 py-3 rounded-md font-bold transition-all ${
          theme === "dark"
            ? "bg-darkPrimary text-darkBg hover:bg-darkSecondary"
            : "bg-lightPrimary text-lightBg hover:bg-lightSecondary"
        }`}>
          Send Reset Link
        </button>

        <p className="text-center mt-4">
          Remembered your password?{" "}
          <a href="/login" className={`font-bold ${
            theme === "dark" ? "text-darkPrimary" : "text-lightPrimary"
          }`}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
