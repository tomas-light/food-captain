import { createStore } from '~/shared/store';

const useRedirectAfterLoginConfig = createStore<{
  route: string | undefined;
}>(
  {
    route: undefined,
  },
  {
    name: 'redirect-after-login-config',
  }
);

export function useRouteToRedirectAfterLogin() {
  return useRedirectAfterLoginConfig((state) => state.route);
}

export function setRouteToRedirectAfterLogin(route: string) {
  useRedirectAfterLoginConfig.setState({ route });
}

export function clearRouteToRedirectAfterLogin() {
  useRedirectAfterLoginConfig.setState({ route: undefined });
}
