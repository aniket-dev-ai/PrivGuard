import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVaultItem, updateVaultItem } from "../../Redux/Slice/VaultSlice";
import toast from "react-hot-toast";

const categories = ["Personal", "Work", "Banking", "Shopping", "Social", "Others"];

const VaultModal = ({ isOpen, onClose, initialData = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    category: "Personal",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        website: "",
        username: "",
        password: "",
        category: "Personal",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.website || !formData.username || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    if (initialData) {
      dispatch(updateVaultItem({ id: initialData._id, ...formData }));
      toast.success("Item updated successfully!");
    } else {
      dispatch(addVaultItem(formData));
      toast.success("Item added to Vault!");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-md rounded-lg p-6 relative shadow-lg transition-all duration-300 bg-white dark:bg-darkCard">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "✏️ Edit Vault Entry" : "➕ Add Vault Entry"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 dark:bg-darkBg dark:text-white"
          />

          <input
            type="text"
            name="username"
            placeholder="Username/Email"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 dark:bg-darkBg dark:text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 dark:bg-darkBg dark:text-white"
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 dark:bg-darkBg dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full p-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VaultModal;
