import type { PropsWithChildren } from 'react';
import classes from './AppLayout.module.scss';

export function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={classes.root}>
      <nav></nav>
      <section>{children}</section>
    </div>
  );
}
