import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../SLice/ThemeSLice";
import authReducer from "../SLice/AuthSlice";
import actionReducer from "../SLice/ActionSLice";
import vaultReducer from "../SLice/VaultSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    action: actionReducer,
    vault: vaultReducer,
  },
});

export default store;
