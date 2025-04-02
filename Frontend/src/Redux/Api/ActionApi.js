import api from "./Base/BaseApi";

// ✅ Fixed API Call
export const FakeDataGenerator = async () => {
  try {
    const response = await api.get("action/fake-data");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || "Unknown error");
    throw error.response?.data?.message || "Fake Data generation failed!";
  }
};
