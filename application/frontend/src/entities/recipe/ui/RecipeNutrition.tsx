import { useRecipeByIdQuery } from '../api/useRecipeByIdQuery';
import type { Recipe } from '../model/Recipe';
import { Nutrition } from './Nutrition';
import { NutritionSkeleton } from './NutritionSkeleton';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeNutrition(props: Props) {
  const { recipeId } = props;

  const { data: recipe, isFetching } = useRecipeByIdQuery({ recipeId });

  if (isFetching) {
    return <NutritionSkeleton />;
  }

  if (!recipe) {
    return null;
  }

  return <Nutrition nutrition={recipe.nutrition} />;
}
