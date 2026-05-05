import { useAppSelector } from '@/store/hooks';

export function useColorScheme() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  return darkMode ? 'dark' : 'light';
}
