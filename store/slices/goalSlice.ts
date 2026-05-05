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

export const updateGoal = createAsyncThunk(
  "goals/update",
  async ({ id, data }: { id: string; data: Partial<Goals> }) => {
    await goalService.update(id, data);
    return { id, data };
  },
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
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
      .addCase(addGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add goal";
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex((g) => g.id === id);
        if (index !== -1) state.items[index] = { ...state.items[index], ...data };
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter((g) => g.id !== action.payload);
      });
  },
});

export const { clearError } = goalSlice.actions;
export default goalSlice.reducer;