import { useMemo } from 'react';
import { Outlet, type RouteObject, useRoutes } from 'react-router';
import { createHomeRoutes } from '~/pages/home/config/createHomeRoutes';
import { NavigateTo, routes } from '~/shared/routes/';

export function PagesRouter() {
  const pageRoutes = useMemo(() => createRoutes(), []);

  return useRoutes(pageRoutes);
}

function createRoutes() {
  const children: RouteObject[] = [
    {
      path: '*',
      element: <NavigateTo to={() => routes.home.url()} />,
    },
    ...createHomeRoutes(),
  ];

  return [
    {
      element: <Outlet />,
      children,
    },
  ];
}
