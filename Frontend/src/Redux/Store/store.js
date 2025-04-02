import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSLice";
import authReducer from "../SLice/AuthSlice";
import actionReducer from "../SLice/ActionSLice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    action: actionReducer,
  },
});

export default store;
