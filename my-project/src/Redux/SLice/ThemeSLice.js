import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
  name: "theme",
    initialState: {
        theme: localStorage.getItem("theme") || "light",
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        },
    },
});

export const { toggleTheme } = themeslice.actions;
export default themeslice.reducer;