import { useQuery } from '@tanstack/react-query';
import { useApiError } from '~/shared/api';
import { convertToMilliseconds } from '~/shared/date';
import { getMyUserAccountQueryKey } from './queryKeys';
import { useAuthApi } from './useAuthApi';

export function useMyUserQuery() {
  const api = useAuthApi();

  const query = useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getMyUserAccountQueryKey(),
    queryFn: api.getMe,
    retry: 0,
  });

  useApiError(query.error);

  return query;
}
