import type { PropsWithChildren } from 'react';
import { useWindowMedia } from './useWindowMedia';

export function Laptop(props: PropsWithChildren) {
  const { children } = props;

  const { isLaptop } = useWindowMedia();

  if (isLaptop) {
    return children;
  }

  return null;
}
