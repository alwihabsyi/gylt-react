import { activityService } from "@/services/activityService";
import { Activity } from "@/types/activity";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ActivityState = {
  items: Activity[];
  loading: boolean;
  error: string | null;
};

const initialState: ActivityState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchActivities = createAsyncThunk(
  "activities/fetchAll",
  async (userId: string) => activityService.getAll(userId),
);

export const addActivity = createAsyncThunk(
  "activities/add",
  async (data: Omit<Activity, "id">) => activityService.add(data),
);

export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id: string) => {
    await activityService.delete(id);
    return id;
  },
);

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch";
      })
      // add
      .addCase(addActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add activity";
      })
      // delete
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearError } = activitySlice.actions;
export default activitySlice.reducer;
