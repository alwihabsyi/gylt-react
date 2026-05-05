import { authService } from "@/services/authService";
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
  createdAt: null
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
  async ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    const user = await authService.signUp(email, password, fullName);
    return { userId: user.uid, email: user.email };
  },
);

export const getUserData = createAsyncThunk(
  "auth/userData",
  async (id: string) => {
    const user = await authService.userData(id);
    return user;
  },
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await authService.signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.userId = null;
      state.email = null;
      state.fullName = null;
      state.createdAt = null
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
        state.loading = false;
        state.userId = action.payload.id;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.createdAt = action.payload.createdAt;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userId = null;
        state.email = null;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
