import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setRouteToRedirectAfterLogin } from '~/entities/user';
import type { ApiError } from '~/shared/api/ApiError';
import { useConfigJson } from '~/shared/config';
import { createApiClient, ApiClientContext } from '~/shared/api';
import { routes } from '~/shared/routes';

export const ApiClientProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);
  locationRef.current = location;

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
      queryCache: new QueryCache({
        onError: handleError,
      }),
      mutationCache: new MutationCache({
        onError: handleError,
      }),
    });

    function handleError(apiError: ApiError) {
      if (apiError.status === 401) {
        void (async () => {
          await navigate(routes.login.url());
          queryClient.clear();

          // setTimeout allows react-router to change url and update its context
          // before we add route to redirect
          setTimeout(() => {
            setRouteToRedirectAfterLogin(
              locationRef.current.pathname + locationRef.current.search
            );
          });
        })();
        return;
      }

      toast(apiError.message, {
        type: 'error',
      });
    }
  }, [navigate]);

  const configJson = useConfigJson();

  const apiClient = useMemo(() => {
    if (!configJson) {
      return undefined;
    }

    return createApiClient(configJson.apiBaseUrl);
  }, [configJson]);

  if (!apiClient) {
    throw new Error('Api client is not initialized');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={apiClient}>
        {children}
      </ApiClientContext.Provider>
    </QueryClientProvider>
  );
};
