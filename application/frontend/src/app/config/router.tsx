import { createBrowserRouter, Outlet, useRouteError } from 'react-router';
import { InitLocaleToRoutes } from '~/shared/routes';
import { addLocaleToRoutes } from '~/shared/routes/addLocaleToRoutes';
import { AppLayout } from '../ui/AppLayout';
import { AppProviders } from './AppProviders';
import { PagesRouter } from './PagesRouter';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <Outlet />,
    errorElement: <RouterRootErrorElement />,
    children: addLocaleToRoutes()({
      element: (
        <InitLocaleToRoutes>
          <AppProviders>
            <AppLayout>
              <PagesRouter />
            </AppLayout>
          </AppProviders>
        </InitLocaleToRoutes>
      ),
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