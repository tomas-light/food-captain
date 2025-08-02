import { createContext, useContext } from 'react';

export type WindowMediaContextType = {
  isDesktop: boolean;
  isMobile: boolean;
};

export const WindowMediaContext = createContext<WindowMediaContextType>({
  isDesktop: false,
  isMobile: false,
});

export function useWindowMedia() {
  return useContext(WindowMediaContext);
}