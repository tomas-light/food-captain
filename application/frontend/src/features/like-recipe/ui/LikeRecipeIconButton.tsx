import clsx from 'clsx';
import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { IconButton, Skeleton } from '~/shared/ui';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { RecipeLikeIcon } from './RecipeLikeIcon';
import { useOnClick } from './useOnClick';
import classes from './LikeRecipeIconButton.module.scss';

type Props = {
  className?: string;
  recipeId: Recipe['id'];
};

export function LikeRecipeIconButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const { data: existedLike, isLoading } = useRecipeLikeQuery({ recipeId });
  const onClick = useOnClick(recipeId);

  if (isLoading) {
    return <Skeleton height={32} width={32} borderRadius="100%" />;
  }

  return (
    <IconButton
      className={clsx(classes.root, className)}
      shape="circle"
      onClick={onClick}
      title={
        existedLike?.status === undefined
          ? t('like')
          : existedLike.status === 'like'
            ? t('dislike')
            : existedLike.status === 'dislike'
              ? t('unlike')
              : undefined
      }
    >
      <RecipeLikeIcon recipeId={recipeId} />
    </IconButton>
  );
}
