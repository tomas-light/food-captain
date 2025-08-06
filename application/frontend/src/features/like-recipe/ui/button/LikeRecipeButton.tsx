import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { Button, Skeleton, Typography } from '~/shared/ui';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import { RecipeLikeIcon } from '../icon/RecipeLikeIcon';
import { useOnLikeClick } from '../useOnLikeClick';

type Props = {
  className?: string;
  recipeId: Recipe['id'] | undefined;
};

export function LikeRecipeButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const { isLoading, isFetching } = useRecipeLikeQuery({ recipeId });

  const onLikeClick = useOnLikeClick(recipeId);

  if (isLoading) {
    return <Skeleton height={40} width={100} />;
  }

  return (
    <Button
      variant="outline"
      elevated
      className={className}
      onClick={onLikeClick}
      loading={isFetching}
      icon={<RecipeLikeIcon recipeId={recipeId} />}
    >
      <Typography>{t('like')}</Typography>
    </Button>
  );
}
