import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date';
import { getMyUserAccountQueryKey } from './queryKeys';
import { useAuthApi } from './useAuthApi';

export function useMyUserQuery() {
  const api = useAuthApi();

  return useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getMyUserAccountQueryKey(),
    queryFn: api.getMe,
    retry: 0,
  });
}
