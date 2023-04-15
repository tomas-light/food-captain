import { FC, ReactNode } from 'react';
import { theme } from '@food-captain/client-shared';
import { NavigationBar } from '~/Layout/NavigationBar';
import { NavigationPanel } from './NavigationPanel';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        height: '100vh',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <NavigationPanel />

      <main
        style={{
          height: '100%',
          overflow: 'auto',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <NavigationBar />

        {children}
      </main>

      {/* <Notifier />*/}
    </div>
  );
};

export { Layout };
