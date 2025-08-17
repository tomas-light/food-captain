import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';
import { useBoolean } from '~/shared/state';
import { IconButton } from '~/shared/ui';

const darkThemeMediaQuery = window.matchMedia('(color-scheme: dark)');

export function SwitchThemeIconButton() {
  const {
    value: isDarkTheme,
    setValue: setIsDarkTheme,
    toggle: toggleTheme,
  } = useBoolean(false);

  useEffect(() => {
    darkThemeMediaQuery.addEventListener('change', (event) => {
      setIsDarkTheme(event.matches);
    });
  }, [setIsDarkTheme]);

  return (
    <IconButton
      elevated
      onClick={() => {
        const pseudoRoot = document.querySelector(
          ':root'
        ) as HTMLElement | null;
        if (!pseudoRoot) {
          return;
        }

        pseudoRoot.style.setProperty(
          'color-scheme',
          isDarkTheme ? 'light' : 'dark'
        );
        toggleTheme();
      }}
    >
      {isDarkTheme ? <Moon /> : <Sun />}
    </IconButton>
  );
}
