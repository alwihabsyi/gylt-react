/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Palette = {
  AppColor: "#000000",
  Canvas: "#F2FAF4",
  Blue400: "#42A5F5",
  Teal300: "#1AC6FF",
  Grey1: "#F7F8FA",
  Black1: "rgba(34, 34, 34, 0.66)", // 0xA9 in hex is ~0.66 alpha
  Black2: "#000000",
  Black_50: "rgba(0, 0, 0, 0.39)", // 0x64 in hex is ~0.39 alpha
  RedErrorDark: "#B00020",
  RedErrorLight: "#EF5350",
  SurfaceDark: "#252323",
  SurfaceLight: "#FFFFFF",
  InkDark: "#0D2118",
  InkMuted: "#5A8A6A",
  CardSurface: "#FFFFFF",
  CardBorder: "#D6EDE0",

  // Accent Colors
  WatermelonRed: "#FF6B6B",
  MangoOrange: "#FF9F43",
  SunshineYellow: "#FDCB6E",
  TealGreen: "#00D2D3",
  OceanBlue: "#54A0FF",
  CobaltBlue: "#2E86DE",
  PoppyRed: "#EE5253",
  MustardYellow: "#F1C40F",
  EmeraldGreen: "#10AC84",
  BrightGreen: "#68DCB5",
  StarkWhite: "#FFFFFF",
};

export const Colors = {
  light: {
    primary: Palette.AppColor,
    primaryContainer: Palette.Blue400,
    onPrimary: Palette.Black2,
    secondary: Palette.StarkWhite,
    secondaryContainer: Palette.Teal300,
    error: Palette.RedErrorDark,
    onError: Palette.RedErrorLight,
    background: Palette.Grey1,
    onBackground: Palette.Black2,
    surface: Palette.SurfaceLight,
    ...Palette,
  },
  dark: {
    primary: Palette.StarkWhite,
    background: Palette.SurfaceDark,
    ...Palette,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
