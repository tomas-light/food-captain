import type { PropsWithChildren } from 'react';
import { useWindowMedia } from './useWindowMedia';

export function Desktop(props: PropsWithChildren) {
  const { children } = props;

  const { isDesktop } = useWindowMedia();

  if (isDesktop) {
    return children;
  }

  return null;
}
