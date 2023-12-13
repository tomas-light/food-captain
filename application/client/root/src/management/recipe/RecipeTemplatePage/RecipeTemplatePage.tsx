import { FC, useRef } from 'react';
import { Button, Icon, NumberField } from '@food-captain/client-shared';
import { NewRecipe, Recipe } from '../../../models';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import {
  EditableImage,
  GalleryModal,
  GalleryModalRef,
} from '../../../templates';
import { useLocaleResource } from '../../../config/i18next';
import { RecipeDescription, RecipeDescriptionProps } from './RecipeDescription';
import { RecipeIngredients, RecipeIngredientsProps } from './RecipeIngredients';
import { RecipeTags, RecipeTagsProps } from './RecipeTags';
import classes from './RecipeTemplatePage.module.scss';

type Props = Pick<
  RecipeIngredientsProps,
  'onAddIngredients' | 'onChangeIngredient' | 'onDeleteIngredient'
> &
  Pick<RecipeTagsProps, 'onAddTag' | 'onDeleteTag'> &
  Pick<
    RecipeDescriptionProps,
    | 'onNameChanged'
    | 'onAddDescriptionBlock'
    | 'onChangeDescriptionBlocks'
    | 'onChangeDescriptionBlock'
    | 'onDeleteDescriptionBlock'
  > & {
    recipe: Recipe | NewRecipe;
    onImageChanged: (newImageId: Recipe['image_id']) => void;
    onKcalChanged: (kcal: Recipe['kcal'] | null) => void;
    onCookingTimeChanged: (
      minutes: Recipe['cooking_time_in_minutes'] | null
    ) => void;

    onSave: () => void;
    onResetDraft: () => void;
  };

export const RecipeTemplatePage: FC<Props> = (props) => {
  const {
    recipe,
    onNameChanged,
    onImageChanged,
    onKcalChanged,
    onCookingTimeChanged,
    onAddIngredients,
    onChangeIngredient,
    onDeleteIngredient,
    onAddTag,
    onDeleteTag,
    onAddDescriptionBlock,
    onChangeDescriptionBlock,
    onChangeDescriptionBlocks,
    onDeleteDescriptionBlock,
    onSave,
    onResetDraft,
  } = props;

  const { t } = useTranslation();

  const galleryModalRef = useRef<GalleryModalRef>(null);

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  return (
    <div className={classes.root}>
      <GalleryModal onChoose={onImageChanged} ref={galleryModalRef} />

      <EditableImage
        className={classes.image}
        imageId={recipe.image_id}
        imageTags={['recipe']}
        onImageChanged={onImageChanged}
        onOpenGallery={() => {
          galleryModalRef.current?.onOpen();
        }}
      />

      <div className={classes.stats}>
        <div className={classes.kcal}>
          <NumberField
            value={recipe.kcal ?? 0}
            onChange={onKcalChanged}
            prefix={<Icon variant={'fire'} />}
            suffix={t('recipe.kcal') ?? ''}
          />

          <NumberField
            value={recipe.cooking_time_in_minutes ?? 0}
            onChange={onCookingTimeChanged}
            prefix={<Icon variant={'timer'} />}
            suffix={t('recipe.minutes') ?? ''}
          />
        </div>

        <RecipeTags
          tags={recipe.tags}
          onAddTag={onAddTag}
          onDeleteTag={onDeleteTag}
        />
      </div>

      <RecipeIngredients
        className={classes.ingredients}
        ingredients={recipe.ingredients}
        onAddIngredients={onAddIngredients}
        onChangeIngredient={onChangeIngredient}
        onDeleteIngredient={onDeleteIngredient}
      />

      <RecipeDescription
        className={classes.description}
        name={recipe.name}
        onNameChanged={onNameChanged}
        blocks={recipe.description?.blocks ?? []}
        onAddDescriptionBlock={onAddDescriptionBlock}
        onChangeDescriptionBlocks={onChangeDescriptionBlocks}
        onChangeDescriptionBlock={onChangeDescriptionBlock}
        onDeleteDescriptionBlock={onDeleteDescriptionBlock}
      />

      <div className={classes.resultButtons}>
        <Button
          variant={'outline'}
          color={'destructive'}
          onClick={onResetDraft}
        >
          {t('recipe.resetDraft')}
        </Button>

        <Button onClick={onSave}>{t('buttons.save')}</Button>
      </div>
    </div>
  );
};
