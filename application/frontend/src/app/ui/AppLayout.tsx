import type { PropsWithChildren } from 'react';
import { Header } from './header/Header';
import classes from './AppLayout.module.scss';

export function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={classes.root}>
      <Header />

      <section>{children}</section>
    </div>
  );
}
