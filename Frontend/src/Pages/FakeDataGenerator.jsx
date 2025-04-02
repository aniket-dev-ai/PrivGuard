import { useDispatch, useSelector } from "react-redux";
import { fakedatas } from "../Redux/Slice/ActionSlice";
import { FaUser, FaEnvelope, FaKey, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const FakeDataGenerator = () => {
  const dispatch = useDispatch();
  const { fakeData, loading } = useSelector((state) => state.action);
  const theme = useSelector((state) => state.theme.theme);

  // ✅ Generate Fake Data
  const handleGenerate = () => {
    dispatch(fakedatas());
  };

  // Theme-based Colors
  const bgColor = theme === "dark" ? "bg-darkBg" : "bg-lightBg";
  const cardColor = theme === "dark" ? "bg-darkCard" : "bg-lightCard";
  const textColor = theme === "dark" ? "text-darkText" : "text-lightText";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const buttonPrimary = theme === "dark" ? "bg-darkPrimary" : "bg-lightPrimary";

  return (
    <div className={`w-full min-h-[85vh] flex items-center justify-center ${bgColor} p-6 transition-all`}>
      <div className={`w-full max-w-2xl ${cardColor} rounded-lg shadow-lg p-6 border ${borderColor} transition-all`}>
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-6 ${textColor}`}>
          🔒 Fake Data Generator
        </h2>

        {/* Generate Fake Data Button */}
        <button
          onClick={handleGenerate}
          className={`w-full py-3 rounded-lg ${buttonPrimary} text-white font-semibold text-lg shadow-md hover:opacity-80 transition-all`}
        >
          {loading ? "Generating..." : "⚡ Generate Fake Data"}
        </button>

        {/* Display Generated Data */}
        {fakeData.length > 0 && (
          <div className="mt-6 p-4 rounded-lg border border-opacity-50 shadow-md">
            <div className="flex items-center gap-2 md:gap-3">
              <FaUser className="text-lg text-darkPrimary" />
              <p className={`text-sm md:text-lg ${textColor}`}><strong>Name:</strong> {fakeData[0].name}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 mt-3">
              <FaEnvelope className="text-lg text-darkPrimary" />
              <p className={`text-sm md:text-lg ${textColor}`}><strong>Email:</strong> {fakeData[0].email}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 mt-3">
              <FaKey className="text-lg text-darkPrimary" />
              <p className={`text-sm md:text-lg ${textColor}`}><strong>Password:</strong> {fakeData[0].password}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 mt-3">
              <FaMapMarkerAlt className="text-lg text-darkPrimary" />
              <p className={`text-sm md:text-lg ${textColor}`}><strong>Address:</strong> {fakeData[0].address}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 mt-3">
              <FaPhone className="text-lg text-darkPrimary" />
              <p className={`text-sm md:text-lg ${textColor}`}><strong>Phone:</strong> {fakeData[0].phoneNumber}</p>
            </div>
          </div>
        )}

        {/* Save & Show Data Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="w-full sm:w-1/2 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all">
            ✅ Save Fake Data
          </button>
          <button className="w-full sm:w-1/2 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all">
            📂 Show Saved Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakeDataGenerator;
