import { useQuery } from '@tanstack/react-query';
import { convertToMilliseconds } from '~/shared/date';
import { getIngredientsQueryKey } from './queryKeys';
import { useIngredientApi } from './useIngredientApi';

export function useIngredientsQuery() {
  const api = useIngredientApi();

  return useQuery({
    staleTime: convertToMilliseconds(5, 'minutes'),

    queryKey: getIngredientsQueryKey(),
    queryFn: api.getIngredients,
  });
}
