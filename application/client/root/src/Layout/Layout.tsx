import { FC, ReactNode } from 'react';
import { NavigationBar } from '~/Layout/NavigationBar';
import { NavigationPanel } from './NavigationPanel';
import classes from './Layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={classes.root}>
      <NavigationPanel />

      <main className={classes.main}>
        <NavigationBar />

        {children}
      </main>

      {/* <Notifier />*/}
    </div>
  );
};

export { Layout };
