import { HeartCrack } from 'lucide-react';
import type { Recipe } from '~/entities/recipe';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import classes from './Icon.module.scss';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeDislikeIcon(props: Props) {
  const { recipeId } = props;

  const { data: existedLike } = useRecipeLikeQuery({ recipeId });

  return (
    <HeartCrack
      className={classes.icon}
      fill={existedLike?.status === 'dislike' ? 'rgba(0,0,0,0.3)' : 'none'}
    />
  );
}
