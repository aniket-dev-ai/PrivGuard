import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVaultItems,
  removeVaultItem,
  addMasterKey,
  validateMasterKey,
} from "../../Redux/Slice/VaultSlice";
import { FiTrash2, FiEye, FiEyeOff, FiCopy, FiEdit } from "react-icons/fi";
import VaultForm from "./VaultForm";
import toast from "react-hot-toast";

const VaultPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.vault);
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);

  const [showForm, setShowForm] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [hasMasterKey, setHasMasterKey] = useState(null);
  const [enteredKey, setEnteredKey] = useState("");
  const [newKey, setNewKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔐 CHECK MASTER KEY STATUS FROM USER DATA
  useEffect(() => {
    if (user) {
      setHasMasterKey(user.hasKey || false); // Yeh field tu backend user model mein add karna, default false
    }
  }, [user]);

  // 📦 Fetch Vault Only if Authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchVaultItems());
    }
  }, [isAuthenticated, dispatch]);

  // 🔐 Handle Unlocking Vault
  const handleKeySubmit = async () => {
    try {
      const res = await dispatch(validateMasterKey(enteredKey)).unwrap();
      if (res.success) {
        setIsAuthenticated(true);
        toast.success("Vault unlocked 💖");
      } else {
        toast.error("Wrong master key 😔");
      }
    } catch (err) {
      toast.error("Failed to validate key");
    }
  };

  // 🔐 Create Master Key First Time
  const handleKeyCreation = async () => {
    if (newKey.length < 6) {
      toast.error("Master key must be at least 6 characters long.");
      return;
    }
    try {
      const res = await dispatch(addMasterKey(newKey)).unwrap();
      console.log("ress",res);
      if (res.user) {
        toast.success("Master key saved 🎉 Now unlock to access vault");
        setHasMasterKey(true);
        setNewKey(""); 
      }
    } catch (err) {
      toast.error("Failed to save master key");
    }
  };

  // 👁️ Toggle Password Visibility
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 📋 Copy Password
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard 📋");
  };

  return (
    <div
      className={`pt-20 px-4 md:px-10 min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-darkBg text-darkText"
          : "bg-lightBg text-lightText"
      }`}
    >
      {hasMasterKey === null ? (
        <p className="text-center">🔍 Checking security status...</p>
      ) : !hasMasterKey ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-bold mb-3">🛡️ Create Your Master Key</h2>
          <input
            type="password"
            placeholder="Enter a strong master key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="px-4 py-2 border rounded-md text-lightText"
          />
          <button
            onClick={handleKeyCreation}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Key
          </button>
        </div>
      ) : !isAuthenticated ? (
        <div className="text-center mt-20">
          <h2 className="text-xl font-bold mb-3">🔒 Enter Your Master Key</h2>
          <input
            type="password"
            placeholder="Enter master key"
            value={enteredKey}
            onChange={(e) => setEnteredKey(e.target.value)}
            className="px-4 py-2 border rounded-md text-lightText"
          />
          <button
            onClick={handleKeySubmit}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Unlock Vault
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">🔐 Your Vault</h1>
              <p className="text-sm text-gray-500">
                All your secrets, safe and sound 💖
              </p>
            </div>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className={`mt-4 sm:mt-0 px-4 py-2 rounded font-semibold ${
                theme === "dark"
                  ? "bg-darkPrimary text-black"
                  : "bg-lightPrimary text-white"
              }`}
            >
              {showForm ? "❌ Close Form" : "➕ Add Password"}
            </button>
          </div>

          {/* Vault Form */}
          {showForm && (
            <div className="mb-6">
              <VaultForm />
            </div>
          )}

          {/* Vault Items */}
          <div
            className={`rounded-md shadow-md ${
              theme === "dark" ? "bg-darkCard" : "bg-lightCard"
            } p-4`}
          >
            <h2 className="text-lg font-semibold mb-4">
              🗂️ Stored Vault Items
            </h2>
            {loading ? (
              <p>Loading your vault...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : items.length === 0 ? (
              <p>No vault entries yet. Add some! 😍</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className={`rounded-lg shadow hover:shadow-lg border border-gray-600 p-4 flex flex-col justify-between transition-all duration-200 ${
                      theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f9f9f9]"
                    }`}
                  >
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold break-words">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.website}</p>
                      <p className="text-xs text-gray-400">{item.username}</p>
                      {item.notes && (
                        <p className="mt-1 text-xs text-gray-400 italic">
                          📝 {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type={visiblePasswords[item._id] ? "text" : "password"}
                        readOnly
                        value={item.password}
                        className={`w-full px-3 py-1 rounded bg-transparent border border-gray-500 text-sm ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-4 space-x-3">
                      <button
                        onClick={() => togglePasswordVisibility(item._id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Show/Hide Password"
                      >
                        {visiblePasswords[item._id] ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(item.password)}
                        className="text-green-500 hover:text-green-700"
                        title="Copy Password"
                      >
                        <FiCopy size={18} />
                      </button>

                      <button
                        onClick={() => toast("Edit coming soon 😘")}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Edit Entry"
                      >
                        <FiEdit size={18} />
                      </button>

                      <button
                        onClick={() => dispatch(removeVaultItem(item._id))}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Entry"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VaultPage;
