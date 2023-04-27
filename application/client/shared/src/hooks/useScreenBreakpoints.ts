import { useEffect, useState } from 'react';

type Breakpoint = 320 | 480 | 768 | 1280 | 1600 | 1920;

type ScreenBreakpoints = {
  [breakpoint in Breakpoint]: boolean;
};

const initialState: {
  equal: ScreenBreakpoints;
  more: ScreenBreakpoints;
} = {
  equal: {
    320: false,
    480: false,
    768: false,
    1280: false,
    1600: false,
    1920: false,
  },
  more: {
    320: false,
    480: false,
    768: false,
    1280: false,
    1600: false,
    1920: false,
  },
};

export function useScreenBreakpoints() {
  const [widthBreakpoint, setWidthBreakpoint] = useState(initialState);

  useEffect(() => {
    function setBreakpoints(screenWidth: number) {
      let equal: Partial<ScreenBreakpoints> | undefined = undefined;
      let more: Partial<ScreenBreakpoints> | undefined = undefined;

      if (screenWidth >= 1920) {
        equal = {
          1920: true,
        };
        more = {
          1920: true,
        };
      }
      if (screenWidth >= 1600) {
        equal = equal || {
          1600: true,
        };
        more = {
          ...more,
          1600: true,
        };
      }
      if (screenWidth >= 1280) {
        equal = equal || {
          1280: true,
        };
        more = {
          ...more,
          1280: true,
        };
      }
      if (screenWidth >= 768) {
        equal = equal || {
          768: true,
        };
        more = {
          ...more,
          768: true,
        };
      }
      if (screenWidth >= 480) {
        equal = equal || {
          480: true,
        };
        more = {
          ...more,
          480: true,
        };
      }
      if (screenWidth >= 320) {
        equal = equal || {
          320: true,
        };
        more = {
          ...more,
          320: true,
        };
      }
      // less than 320
      equal = equal || {
        320: true,
      };

      setWidthBreakpoint({
        ...initialState,
        equal: {
          ...initialState.equal,
          ...(equal as ScreenBreakpoints),
        },
        more: {
          ...initialState.more,
          ...(more as ScreenBreakpoints),
        },
      });
    }

    setBreakpoints(window.innerWidth);

    const resizeListener = (event: UIEvent) => {
      const width = (event.currentTarget as Window)?.innerWidth;
      if (!width) {
        return;
      }

      setBreakpoints(width);
    };

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return widthBreakpoint;
}
