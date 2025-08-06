import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { Button, Skeleton, Typography } from '~/shared/ui';
import { useRecipeLikeQuery } from '../../api/useRecipeLikeQuery';
import { RecipeDislikeIcon } from '../icon/RecipeDislikeIcon';
import { useOnDislikeClick } from '../useOnDislikeClick';

type Props = {
  className?: string;
  recipeId: Recipe['id'] | undefined;
};

export function DislikeRecipeButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const { isLoading, isFetching } = useRecipeLikeQuery({ recipeId });

  const onDislikeClick = useOnDislikeClick(recipeId);

  if (isLoading) {
    return <Skeleton height={40} width={100} />;
  }

  return (
    <Button
      variant="outline"
      elevated
      className={className}
      onClick={onDislikeClick}
      loading={isFetching}
      icon={<RecipeDislikeIcon recipeId={recipeId} />}
    >
      <Typography>{t('dislike')}</Typography>
    </Button>
  );
}
