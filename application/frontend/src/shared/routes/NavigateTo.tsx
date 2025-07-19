import { Navigate, type NavigateProps, useParams } from 'react-router';

type Props<RouteParams extends Record<string, string | undefined>> = Omit<
  NavigateProps,
  'to'
> & {
  /**
   * Callback is needed to use actual base path in "routes" object of call time,
   * instead of use value of definition time.
   * @example
   * // Also, you can use the callback to redirect with router parameters
   * <NavigateTo
   *   to={({ userId }) =>
   *     routes.user.userId(userId).info.url()
   *   }
   * />
   * */
  to: (routeParams: RouteParams) => NavigateProps['to'];
};

/**
 * The difference from "Navigate" in react-router is only "to"-prop is callback instead of value.
 * Callback is needed to use actual base path in "routes" object of call time,
 * instead of use value of definition time
 *
 * @example
 * const wrongRedirect: RouteObject[] = [
 *   {
 *     index: true,
 *     element: <Navigate to={routes.user.url()} />, // will redirect to '/user'
 *   },
 * ];
 * const correctRedirect: RouteObject[] = [
 *   {
 *     index: true,
 *     element: <NavigateTo to={() => routes.user.url()} />, // will redirect to '/en/user'
 *   },
 * ];
 * routes.setBaseRoute('en'); // setting locale to base path
 *
 * @example
 * const routes: RouteObject[] = [
 *   {
 *     path: routes.user.userId().relativeUrl(),
 *     element: <Outlet />,
 *     children: [
 *       {
 *         index: true,
 *         element: (
 *           <NavigateTo
 *             to={({ userId }) =>
 *               routes.user.userId(userId).info.url()
 *             }
 *           />
 *         ),
 *       },
 *       {
 *         path: routes.user.userId().info.relativeUrl(),
 *         element: null,
 *       },
 *     ],
 *   },
 * ];
 * */
export function NavigateTo<
  RouteParams extends Record<string, string | undefined>,
>(props: Props<RouteParams>) {
  const { to, ...rest } = props;
  const routeParams = useParams() as RouteParams;
  return <Navigate to={to(routeParams)} {...rest} />;
}
