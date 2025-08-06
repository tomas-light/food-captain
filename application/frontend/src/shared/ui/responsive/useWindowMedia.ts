import { createContext, useContext } from 'react';

export type WindowMediaContextType = {
  isDesktop: boolean;
  isLaptop: boolean;
  isMobile: boolean;
};

export const WindowMediaContext = createContext<WindowMediaContextType>({
  isDesktop: false,
  isLaptop: false,
  isMobile: false,
});

export function useWindowMedia() {
  return useContext(WindowMediaContext);
}