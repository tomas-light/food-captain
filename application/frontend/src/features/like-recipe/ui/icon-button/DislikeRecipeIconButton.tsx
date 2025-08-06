import clsx from 'clsx';
import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { IconButton, Skeleton } from '~/shared/ui';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import { RecipeDislikeIcon } from '../icon/RecipeDislikeIcon';
import { useOnDislikeClick } from '../useOnDislikeClick';
import classes from './IconButton.module.scss';

type Props = {
  className?: string;
  recipeId: Recipe['id'];
};

export function DislikeRecipeIconButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const { isLoading } = useRecipeLikeQuery({ recipeId });
  const onDislikeClick = useOnDislikeClick(recipeId);

  if (isLoading) {
    return <Skeleton height={32} width={32} borderRadius="100%" />;
  }

  return (
    <IconButton
      className={clsx(classes.root, className)}
      shape="circle"
      onClick={onDislikeClick}
      title={t('dislike')}
      elevated
    >
      <RecipeDislikeIcon recipeId={recipeId} />
    </IconButton>
  );
}
