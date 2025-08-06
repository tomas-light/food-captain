import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { WindowMediaContext, type WindowMediaContextType } from '~/shared/ui';

const laptopWidthMediaQuery = window.matchMedia('(max-width: 1366px)');
const mobileWidthMediaQuery = window.matchMedia('(max-width: 767px)');

export function WindowMediaContextProvider(props: PropsWithChildren) {
  const { children } = props;

  const [size, setSize] = useState<'mobile' | 'laptop' | 'desktop'>('desktop');

  useEffect(() => {
    setSizeByMedia();

    mobileWidthMediaQuery.addEventListener('change', setSizeByMedia);
    laptopWidthMediaQuery.addEventListener('change', setSizeByMedia);

    function setSizeByMedia() {
      if (mobileWidthMediaQuery.matches) {
        setSize('mobile');
      } else if (laptopWidthMediaQuery.matches) {
        setSize('laptop');
      } else {
        setSize('desktop');
      }
    }
  }, []);

  const contextValue = useMemo((): WindowMediaContextType => {
    return {
      isDesktop: size === 'desktop',
      isLaptop: size === 'laptop',
      isMobile: size === 'mobile',
    };
  }, [size]);

  return (
    <WindowMediaContext value={contextValue}>{children}</WindowMediaContext>
  );
}
