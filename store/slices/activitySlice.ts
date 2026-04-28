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
export const fetchActivitys = createAsyncThunk(
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchActivitys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitys.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActivitys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch";
      })
      // add
      .addCase(addActivity.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // delete
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default activitySlice.reducer;
