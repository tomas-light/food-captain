import type { MouseEventHandler } from 'react';
import type { Recipe } from '~/entities/recipe';
import { useLikeRecipeMutation } from '../api/useLikeRecipeMutation';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { useUnlikeRecipeMutation } from '../api/useUnlikeRecipeMutation';

export function useOnLikeClick(
  recipeId: Recipe['id'] | undefined
): MouseEventHandler<HTMLButtonElement> {
  const { data: existedLike } = useRecipeLikeQuery({ recipeId });
  const { mutate: likeRecipe } = useLikeRecipeMutation();
  const { mutate: unlikeRecipe } = useUnlikeRecipeMutation();

  return (event) => {
    event.stopPropagation();
    if (recipeId == null) {
      return;
    }

    switch (existedLike?.status) {
      case 'like':
        unlikeRecipe(recipeId);
        break;

      default:
        likeRecipe(recipeId);
        break;
    }
  };
}
