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
    text: Palette.InkDark,
    background: Palette.Canvas,
    tint: Palette.BrightGreen,
    icon: Palette.InkMuted,
    tabIconDefault: Palette.InkMuted,
    tabIconSelected: Palette.BrightGreen,

    primary: Palette.BrightGreen,
    primaryContainer: Palette.EmeraldGreen,
    onPrimary: Palette.StarkWhite,

    secondary: Palette.StarkWhite,
    secondaryContainer: Palette.TealGreen,

    error: Palette.RedErrorDark,
    onError: Palette.RedErrorLight,
    onBackground: Palette.InkDark,
    surface: Palette.SurfaceLight,
    ...Palette,
  },

  dark: {
    text: Palette.StarkWhite,
    background: Palette.SurfaceDark,
    tint: Palette.BrightGreen,
    icon: Palette.InkMuted,
    tabIconDefault: Palette.InkMuted,
    tabIconSelected: Palette.BrightGreen,

    primary: Palette.BrightGreen,
    primaryContainer: Palette.EmeraldGreen,
    onPrimary: Palette.StarkWhite,
    surface: Palette.SurfaceDark,
    ...Palette,
  },
};

/**
 * Semantic UI colors: light values match existing screens; dark values are paired equivalents.
 * Use via `useSemanticColors()` so screens respond to the in-app theme toggle.
 */
export type SemanticColorScheme = {
  screenGrey: string;
  canvas: string;
  surface: string;
  surfaceMuted: string;
  surfaceInset: string;
  surfaceWarning: string;
  surfaceDangerTint: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textPlaceholder: string;
  textPlaceholderAlt: string;
  border: string;
  divider: string;
  borderLight: string;
  borderHairline: string;
  chevron: string;
  shadow: string;
  switchTrackOff: string;
  switchThumb: string;
  pillHandle: string;
  overlayScrim: string;
  inverseOnAccent: string;
  tabInactive: string;
  fabLabelBg: string;
  fabLabelBorder: string;
  fabLabelText: string;
  danger: string;
  dangerBorder: string;
  iosBlue: string;
  progressTrack: string;
  hairlineDivider: string;
  sheetHandle: string;
};

export const SemanticColors: Record<"light" | "dark", SemanticColorScheme> = {
  light: {
    screenGrey: "#F5F5F5",
    canvas: Palette.Canvas,
    surface: "#FFFFFF",
    surfaceMuted: "#F2F2F2",
    surfaceInset: "rgba(158,158,158,0.1)",
    surfaceWarning: "#FFF5F5",
    surfaceDangerTint: "#FFF0F0",
    textPrimary: "#000000",
    textSecondary: "#4A4A4A",
    textMuted: "#9E9E9E",
    textPlaceholder: "#A0A0A0",
    textPlaceholderAlt: "#BCBCBC",
    border: "#E0E0E0",
    divider: "#F0F0F0",
    borderLight: "#D3D3D3",
    borderHairline: "lightgray",
    chevron: "#C0C0C0",
    shadow: "#000000",
    switchTrackOff: "#D3D3D3",
    switchThumb: "#FFFFFF",
    pillHandle: "#DDDDDD",
    overlayScrim: "rgba(0,0,0,0.3)",
    inverseOnAccent: "#FFFFFF",
    tabInactive: "#9E9E9E",
    fabLabelBg: "#FFFFFF",
    fabLabelBorder: "rgba(0,0,0,0.06)",
    fabLabelText: "#000000",
    danger: "#E53935",
    dangerBorder: "#FFCDD2",
    iosBlue: "#007AFF",
    progressTrack: "rgba(158,158,158,0.4)",
    hairlineDivider: "rgba(0,0,0,0.06)",
    sheetHandle: "rgba(0,0,0,0.15)",
  },
  dark: {
    screenGrey: "#1C1C1E",
    canvas: "#171C19",
    surface: "#2C2C2E",
    surfaceMuted: "#3A3A3C",
    surfaceInset: "rgba(255,255,255,0.08)",
    surfaceWarning: "#2C2121",
    surfaceDangerTint: "#3A2828",
    textPrimary: "#F2F2F7",
    textSecondary: "#AEAEB2",
    textMuted: "#8E8E93",
    textPlaceholder: "#636366",
    textPlaceholderAlt: "#636366",
    border: "#48484A",
    divider: "#38383A",
    borderLight: "#48484A",
    borderHairline: "#48484A",
    chevron: "#636366",
    shadow: "#000000",
    switchTrackOff: "#39393D",
    switchThumb: "#F2F2F7",
    pillHandle: "#48484A",
    overlayScrim: "rgba(0,0,0,0.65)",
    inverseOnAccent: "#FFFFFF",
    tabInactive: "#8E8E93",
    fabLabelBg: "#2C2C2E",
    fabLabelBorder: "rgba(255,255,255,0.12)",
    fabLabelText: "#F2F2F7",
    danger: "#FF6B6B",
    dangerBorder: "#5C3434",
    iosBlue: "#0A84FF",
    progressTrack: "rgba(255,255,255,0.22)",
    hairlineDivider: "rgba(255,255,255,0.1)",
    sheetHandle: "rgba(255,255,255,0.22)",
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
