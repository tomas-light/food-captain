import type { PropsWithChildren } from 'react';
import { TranslatesProvider } from './TranslatesProvider';

export function App(props: PropsWithChildren) {
  const { children } = props;

  return <TranslatesProvider>{children}</TranslatesProvider>;
}
