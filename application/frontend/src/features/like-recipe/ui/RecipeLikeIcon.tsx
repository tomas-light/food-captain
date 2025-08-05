import clsx from 'clsx';
import { Heart, HeartOff } from 'lucide-react';
import type { Recipe } from '~/entities/recipe';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import classes from './RecipeLikeIcon.module.scss';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeLikeIcon(props: Props) {
  const { recipeId } = props;

  const { data: existedLike } = useRecipeLikeQuery({ recipeId });

  if (existedLike?.status === 'dislike') {
    return (
      <HeartOff
        className={clsx(classes.icon, classes.disliked)}
        fill="currentColor"
      />
    );
  }

  return (
    <Heart
      className={clsx(classes.icon, {
        [classes.liked]: existedLike?.status === 'like',
      })}
      fill={existedLike?.status === 'like' ? 'currentColor' : 'none'}
    />
  );
}
