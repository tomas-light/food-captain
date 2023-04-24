import { createContext, useContext, useEffect } from 'react';

export type NavigationBarContextType = {
  title?: string;
  setTitle: (title?: string) => void;
};

export const NavigationBarContext = createContext<NavigationBarContextType>({
  setTitle: () => {},
});

export function makeDocumentTitle(title: string) {
  return `${title} | Food Captain`;
}

export function useTitle(title?: string | null) {
  const { setTitle } = useContext(NavigationBarContext);
  useEffect(() => {
    if (title) {
      document.title = makeDocumentTitle(title);
      setTitle(title);
    }
  }, [title]);
}
