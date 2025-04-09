import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVaultItem } from "../../Redux/SLice/VaultSlice";
import zxcvbn from "zxcvbn";
import toast from "react-hot-toast";

const VaultForm = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    title: "",
    notes: "",
  });

  const passwordStrength = zxcvbn(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVaultItem(formData));
    toast.success("Item added to Vault!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-300",
    "bg-green-400",
    "bg-green-600",
  ];
  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-md shadow-md w-full max-w-lg mx-auto mb-6 ${
        theme === "dark"
          ? "bg-darkCard text-darkText"
          : "bg-lightCard text-lightText"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">➕ Add Vault Entry</h2>

      <div className="mb-4">
        <label className="block mb-1">Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border bg-transparent border-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border bg-transparent border-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 rounded border bg-transparent border-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border bg-transparent border-gray-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border bg-transparent border-gray-400 outline-none"
        />

        {/* Strength meter */}
        <div className="mt-2">
          <div className="h-2 rounded-full bg-gray-300 overflow-hidden">
            <div
              style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
              className={`h-full ${
                strengthColors[passwordStrength.score]
              } transition-all duration-300`}
            ></div>
          </div>
          <p className="text-sm mt-1">
            Strength:{" "}
            <span className="font-semibold">
              {strengthText[passwordStrength.score]}
            </span>
          </p>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded mt-2 font-semibold ${
          theme === "dark"
            ? "bg-darkPrimary text-black"
            : "bg-lightPrimary text-white"
        } hover:opacity-90 transition`}
      >
        Save Vault Item
      </button>
    </form>
  );
};

export default VaultForm;
