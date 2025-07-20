import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date/index';
import { getIngredientsQueryKey } from './queryKeys';
import { useIngredientApi } from './useIngredientApi';

export function useIngredientsQuery() {
  const api = useIngredientApi();

  const query = useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getIngredientsQueryKey(),
    queryFn: api.getIngredients,
  });

  return query;
}
