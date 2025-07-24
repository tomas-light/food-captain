import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  clearRouteToRedirectAfterLogin,
  useRouteToRedirectAfterLogin,
} from './useRedirectAfterLoginConfig';

export function AfterLoginRedirector(props: PropsWithChildren) {
  const { children } = props;

  const routeToRedirect = useRouteToRedirectAfterLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (routeToRedirect) {
      clearRouteToRedirectAfterLogin();
      void navigate(routeToRedirect, { replace: true });
    }
  }, [navigate, routeToRedirect]);

  if (routeToRedirect) {
    return null;
  }

  return children;
}
