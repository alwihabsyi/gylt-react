import { SemanticColors, type SemanticColorScheme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useSemanticColors(): SemanticColorScheme {
  const scheme = useColorScheme() ?? "light";
  return SemanticColors[scheme];
}
