import type { MouseEventHandler } from 'react';
import type { Recipe } from '~/entities/recipe';
import { useDislikeRecipeMutation } from '../api/useDislikeRecipeMutation';
import { useLikeRecipeMutation } from '../api/useLikeRecipeMutation';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { useUnlikeRecipeMutation } from '../api/useUnlikeRecipeMutation';

export function useOnClick(
  recipeId: Recipe['id'] | undefined
): MouseEventHandler<HTMLButtonElement> {
  const { data: existedLike } = useRecipeLikeQuery({ recipeId });
  const { mutate: likeRecipe } = useLikeRecipeMutation();
  const { mutate: unlikeRecipe } = useUnlikeRecipeMutation();
  const { mutate: dislikeRecipe } = useDislikeRecipeMutation();

  return (event) => {
    event.stopPropagation();
    if (recipeId == null) {
      return;
    }

    switch (existedLike?.status) {
      case undefined:
        likeRecipe(recipeId);
        break;

      case 'like':
        dislikeRecipe(recipeId);
        break;

      case 'dislike':
        unlikeRecipe(recipeId);
        break;
    }
  };
}
