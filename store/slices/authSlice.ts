import { authService, UpdateProfilePayload } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  userId: string | null;
  email: string | null;
  fullName: string | null;
  loading: boolean;
  error: string | null;
  createdAt: string | null;
};

const initialState: AuthState = {
  userId: null,
  email: null,
  fullName: null,
  loading: false,
  error: null,
  createdAt: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const user = await authService.signIn(email, password);
    return { userId: user.uid, email: user.email };
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, fullName }: { email: string; password: string; fullName: string }) => {
    const user = await authService.signUp(email, password, fullName);
    return { userId: user.uid, email: user.email };
  },
);

export const getUserData = createAsyncThunk(
  "auth/userData",
  async (id: string) => {
    return await authService.userData(id);
  },
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await authService.signOut();
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload: UpdateProfilePayload) => {
    await authService.updateProfile(payload);
    return payload;
  },
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (password: string) => {
    await authService.deleteAccount(password);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.userId = null;
      state.email = null;
      state.fullName = null;
      state.createdAt = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Sign in failed";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Sign up failed";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.createdAt = action.payload.createdAt;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userId = null;
        state.email = null;
        state.fullName = null;
        state.createdAt = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.fullName) state.fullName = action.payload.fullName;
        if (action.payload.email) state.email = action.payload.email;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update profile";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.userId = null;
        state.email = null;
        state.fullName = null;
        state.createdAt = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete account";
      });
  },
});

export const { clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;