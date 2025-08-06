import type { MouseEventHandler } from 'react';
import type { Recipe } from '~/entities/recipe';
import { useDislikeRecipeMutation } from '../api/useDislikeRecipeMutation';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { useUnlikeRecipeMutation } from '../api/useUnlikeRecipeMutation';

export function useOnDislikeClick(
  recipeId: Recipe['id'] | undefined
): MouseEventHandler<HTMLButtonElement> {
  const { data: existedLike } = useRecipeLikeQuery({ recipeId });
  const { mutate: unlikeRecipe } = useUnlikeRecipeMutation();
  const { mutate: dislikeRecipe } = useDislikeRecipeMutation();

  return (event) => {
    event.stopPropagation();
    if (recipeId == null) {
      return;
    }

    switch (existedLike?.status) {
      case 'dislike':
        unlikeRecipe(recipeId);
        break;

      default:
        dislikeRecipe(recipeId);
        break;
    }
  };
}
