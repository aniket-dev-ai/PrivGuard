import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSLice";

const store = configureStore({
  reducer: {
    theme: themeReducer, 
  },
});

export default store;
