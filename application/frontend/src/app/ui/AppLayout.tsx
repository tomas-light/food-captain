import type { PropsWithChildren } from 'react';
import { UserAvatar } from '~/entities/user';
import classes from './AppLayout.module.scss';

export function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={classes.root}>
      <header>
        <nav></nav>

        <UserAvatar />
      </header>

      <section>{children}</section>
    </div>
  );
}
