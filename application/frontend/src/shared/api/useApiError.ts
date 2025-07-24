import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { setRouteToRedirectAfterLogin } from '~/entities/user';
import { routes } from '../routes/';
import type { ApiError } from './ApiError';

export function useApiError(apiError: ApiError | null) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!apiError) {
      return;
    }

    if (apiError.status === 401) {
      void (async () => {
        await navigate(routes.login.url());
        queryClient.clear();

        // setTimeout allows react-router to change url and update its context
        // before we add route to redirect
        setTimeout(() => {
          setRouteToRedirectAfterLogin(location.pathname + location.search);
        });
      })();
      return;
    }

    toast(apiError.message, {
      type: 'error',
    });
  }, [apiError, location, navigate, queryClient]);
}
