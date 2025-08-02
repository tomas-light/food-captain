import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { WindowMediaContext, type WindowMediaContextType } from '~/shared/ui';

const windowWidthMediaQuery = window.matchMedia('(min-width: 1366px)');

export function WindowMediaContextProvider(props: PropsWithChildren) {
  const { children } = props;

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    windowWidthMediaQuery.addEventListener('change', (event) => {
      setIsDesktop(event.matches);
    });
  }, []);

  const contextValue = useMemo((): WindowMediaContextType => {
    return {
      isDesktop: isDesktop,
      isMobile: !isDesktop,
    };
  }, [isDesktop]);

  return (
    <WindowMediaContext value={contextValue}>{children}</WindowMediaContext>
  );
}
