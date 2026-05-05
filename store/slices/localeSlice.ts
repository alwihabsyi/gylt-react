import type { AppLocale } from "@/locales";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LocaleState = {
  locale: AppLocale;
};

const initialState: LocaleState = {
  locale: "en",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<AppLocale>) {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
