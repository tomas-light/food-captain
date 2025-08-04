import { useMemo } from 'react';
import { Outlet, type RouteObject, useRoutes } from 'react-router';
import { createRecipesRoutes } from '~/pages/recipe';
import { NavigateTo, routes } from '~/shared/routes';

export function PagesRouter() {
  const pageRoutes = useMemo(() => createRoutes(), []);

  return useRoutes(pageRoutes);
}

function createRoutes() {
  const children: RouteObject[] = [
    {
      path: '*',
      element: <NavigateTo to={() => routes.recipes.url()} replace />,
    },
    ...createRecipesRoutes(),
  ];

  return [
    {
      element: <Outlet />,
      children,
    },
  ];
}
