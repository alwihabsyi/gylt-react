import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "./slices/activitySlice";
import authReducer from "./slices/authSlice";
import goalReducer from "./slices/goalSlice";

export const store = configureStore({
  reducer: {
    transactions: activityReducer,
    goals: goalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
