import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    darkMode: boolean;
};

const initialState: ThemeState = {
    darkMode: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        },
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },
    },
});

export const { setDarkMode, toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;