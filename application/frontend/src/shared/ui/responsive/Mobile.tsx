import type { PropsWithChildren } from 'react';
import { useWindowMedia } from './useWindowMedia';

export function Mobile(props: PropsWithChildren) {
  const { children } = props;

  const { isMobile } = useWindowMedia();

  if (isMobile) {
    return children;
  }

  return null;
}
