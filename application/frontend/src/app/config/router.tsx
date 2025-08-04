import { createBrowserRouter, Outlet, useRouteError } from 'react-router';
import { createLoginRoutes } from '~/pages/login';
import { addLocaleToRoutes, InitLocaleToRoutes } from '~/shared/routes';
import { AppLayout } from '../ui/AppLayout';
import { AppProviders } from './AppProviders';
import { PagesRouter } from './PagesRouter';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <Outlet />,
    errorElement: <RouterRootErrorElement />,
    children: addLocaleToRoutes({
      element: (
        <InitLocaleToRoutes>
          <AppProviders>
            <Outlet />
          </AppProviders>
        </InitLocaleToRoutes>
      ),
      children: [
        ...createLoginRoutes(),
        {
          path: '*',
          element: (
            <AppLayout>
              <PagesRouter />
            </AppLayout>
          ),
        },
      ],
    }),
  },
]);

function RouterRootErrorElement() {
  const error = useRouteError();

  if (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message.includes('Failed to fetch dynamically imported module')
    ) {
      window.location.reload();
    }
  }

  return <div>Oops, everything crashed 🔥</div>;
}
