import { Heart } from 'lucide-react';
import type { Recipe } from '~/entities/recipe';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import classes from './Icon.module.scss';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeLikeIcon(props: Props) {
  const { recipeId } = props;

  const { data: existedLike } = useRecipeLikeQuery({ recipeId });

  return (
    <Heart
      className={classes.icon}
      fill={existedLike?.status === 'like' ? '#dc2626' : 'none'}
    />
  );
}
