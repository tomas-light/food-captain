import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { invalidateGetMyUserAccountQuery, useAuthApi } from '~/entities/user';
import { routes } from '~/shared/routes';

export function useLoginMutation() {
  const api = useAuthApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: api.login,

    onSuccess: async () => {
      await invalidateGetMyUserAccountQuery(queryClient);
      void navigate(routes.recipes.url());
    },
  });
}
