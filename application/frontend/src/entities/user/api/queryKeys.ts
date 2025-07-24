import type { QueryClient } from '@tanstack/react-query';

export function getMyUserAccountQueryKey() {
  return ['my user account'];
}

export function invalidateGetMyUserAccountQuery(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    queryKey: getMyUserAccountQueryKey()
  })
}