import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { setRouteToRedirectAfterLogin } from '~/entities/auth';
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
      queryClient.clear();
      setRouteToRedirectAfterLogin(location.toString());
      void navigate(routes.login.url());
      return;
    }
  }, [apiError, location, navigate, queryClient]);
}
