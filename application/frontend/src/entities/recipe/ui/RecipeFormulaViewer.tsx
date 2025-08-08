import { Skeleton } from '~/shared/ui';
import { useRecipeByIdQuery } from '../api/useRecipeByIdQuery';
import type { Recipe } from '../model/Recipe';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeFormulaViewer(props: Props) {
  const { recipeId } = props;

  const { data: recipe, isFetching } = useRecipeByIdQuery({ recipeId });

  if (isFetching) {
    return <Skeleton height={200} />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div>
      <pre>{recipe.formula}</pre>
    </div>
  );
}
