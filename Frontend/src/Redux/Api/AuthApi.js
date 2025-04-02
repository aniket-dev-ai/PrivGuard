import api from "./Base/BaseApi";

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await api.post("user/login", userData);
    console.log(response.data);
    return response.data; // { token, user }
  } catch (error) {
    console.log(error.response.data);
    throw error.response?.data?.message || "Login failed!";
  }
};

// Signup API
export const signupUser = async (userData) => {
  try {
    console.log(userData);
    const response = await api.post("user/create", userData);
    console.log(response.data);
    return response.data; // { message, user }
  } catch (error) {
    console.log(error.response.data);
    throw error.response?.data?.message || "Signup failed!";
  }
};
