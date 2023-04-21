import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/config/redux/useSelector';
import { DishController } from './redux/Dish.controller';

export function useDishWithRecipe(dishIdString: string | undefined) {
  const dispatch = useDispatch();

  const dishId = useMemo(() => {
    if (dishIdString == null) {
      return NaN;
    }
    return parseInt(dishIdString, 10);
  }, [dishIdString]);

  const dishes = useSelector((state) => state.dish.dishes);
  const dish = dishes.find((_dish) => _dish.id === dishId);
  const dishRecipesMap = useSelector((state) =>
    state.dish.dishRecipes.get(dish?.id)
  );

  useEffect(() => {
    if (!isNaN(dishId)) {
      dispatch(DishController.loadDishWithRecipe({ dishId }));
    }
  }, [dishId]);

  if (isNaN(dishId)) {
    return { dish: undefined, dishRecipesMap: undefined };
  }

  return { dish, dishRecipesMap };
}
