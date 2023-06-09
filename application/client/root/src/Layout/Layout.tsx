import { FC, ReactNode, useState } from 'react';
import { NavigationBar } from '~/Layout/NavigationBar';
import {
  NavigationBarContext,
  NavigationBarContextType,
} from '~/Layout/NavigationBarContext';
import { NavigationPanel } from './NavigationPanel';
import classes from './Layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={classes.root}>
      <NavigationPanel />

      <Main>{children}</Main>

      {/* <Notifier />*/}
    </div>
  );
};

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  const [barContext, setBarContext] = useState<NavigationBarContextType>({
    setTitle: (title) => setBarContext((state) => ({ ...state, title })),
  });

  return (
    <NavigationBarContext.Provider value={barContext}>
      <main className={classes.main}>
        <NavigationBar />

        {children}
      </main>
    </NavigationBarContext.Provider>
  );
};

export { Layout };
