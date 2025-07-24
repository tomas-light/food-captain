import { useQuery } from '@tanstack/react-query';
import { useApiError } from '~/shared/api';
import { convertToMilliseconds } from '~/shared/date/';
import { getIngredientsQueryKey } from './queryKeys';
import { useIngredientApi } from './useIngredientApi';

export function useIngredientsQuery() {
  const api = useIngredientApi();

  const query = useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getIngredientsQueryKey(),
    queryFn: api.getIngredients,
  });

  useApiError(query.error);

  return query;
}
