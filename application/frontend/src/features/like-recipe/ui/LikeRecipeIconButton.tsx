import clsx from 'clsx';
import { Heart, HeartOff } from 'lucide-react';
import type { Recipe } from '~/entities/recipe';
import { IconButton } from '~/shared/ui/button/IconButton';
import { useDislikeRecipeMutation } from '../api/useDislikeRecipeMutation';
import { useLikeRecipeMutation } from '../api/useLikeRecipeMutation';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { useUnlikeRecipeMutation } from '../api/useUnlikeRecipeMutation';
import classes from './LikeRecipeIconButton.module.scss';

type Props = {
  className?: string;
  recipeId: Recipe['id'];
};

export function LikeRecipeIconButton(props: Props) {
  const { className, recipeId } = props;

  const { data: existedLike, isLoading } = useRecipeLikeQuery({ recipeId });
  const { mutate: likeRecipe } = useLikeRecipeMutation();
  const { mutate: unlikeRecipe } = useUnlikeRecipeMutation();
  const { mutate: dislikeRecipe } = useDislikeRecipeMutation();

  return (
    <IconButton
      className={clsx(classes.root, className)}
      disabled={isLoading}
      shape="circle"
      onClick={() => {
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
      }}
    >
      {existedLike?.status === 'dislike' && (
        <HeartOff
          className={clsx(classes.icon, classes.disliked)}
          fill="currentColor"
        />
      )}

      {existedLike?.status !== 'dislike' && (
        <Heart
          className={clsx(classes.icon, {
            [classes.liked]: existedLike?.status === 'like',
          })}
          fill={existedLike?.status === 'like' ? 'currentColor' : 'none'}
        />
      )}
    </IconButton>
  );
}
