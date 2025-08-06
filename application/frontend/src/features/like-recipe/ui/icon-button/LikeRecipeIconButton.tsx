import clsx from 'clsx';
import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { IconButton, Skeleton } from '~/shared/ui';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import { RecipeLikeIcon } from '../icon/RecipeLikeIcon';
import { useOnLikeClick } from '../useOnLikeClick';
import classes from './IconButton.module.scss';

type Props = {
  className?: string;
  recipeId: Recipe['id'];
};

export function LikeRecipeIconButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const { isLoading } = useRecipeLikeQuery({ recipeId });
  const onLikeClick = useOnLikeClick(recipeId);

  if (isLoading) {
    return <Skeleton height={32} width={32} borderRadius="100%" />;
  }

  return (
    <IconButton
      className={clsx(classes.root, className)}
      shape="circle"
      onClick={onLikeClick}
      title={t('like')}
      elevated
    >
      <RecipeLikeIcon recipeId={recipeId} />
    </IconButton>
  );
}
