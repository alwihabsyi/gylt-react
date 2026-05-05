import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "./slices/activitySlice";
import authReducer from "./slices/authSlice";
import goalReducer from "./slices/goalSlice";
import localeReducer from "./slices/localeSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    transactions: activityReducer,
    goals: goalReducer,
    auth: authReducer,
    theme: themeReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;