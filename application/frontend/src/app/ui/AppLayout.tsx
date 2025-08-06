import type { PropsWithChildren } from 'react';
import { Header } from './header/Header';
import { Sidebar } from './sidebar/Sidebar';
import classes from './AppLayout.module.scss';

export function AppLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />

      <main>
        <section className={classes.page}>{children}</section>

        <Sidebar />
      </main>
    </>
  );
}
