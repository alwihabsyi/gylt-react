import { Goals } from "@/domain/Goals";
import { goalService } from "@/services/goalService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type GoalState = {
  items: Goals[];
  loading: boolean;
  error: string | null;
};

const initialState: GoalState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchGoals = createAsyncThunk(
  "goals/fetchAll",
  async (userId: string) => goalService.getAll(userId),
);

export const addGoal = createAsyncThunk(
  "goals/add",
  async (data: Omit<Goals, "id">) => goalService.add(data),
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string) => {
    await goalService.delete(id);
    return id;
  },
);

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch";
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter((g) => g.id !== action.payload);
      });
  },
});

export default goalSlice.reducer;
