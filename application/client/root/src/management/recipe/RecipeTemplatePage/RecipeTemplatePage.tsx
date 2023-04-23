import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, NumberField } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { NewRecipe, Recipe } from '~/models';
import { EditableImage, GalleryModal, GalleryModalRef } from '~/templates';
import { RecipeDescription, RecipeDescriptionProps } from './RecipeDescription';
import { RecipeIngredients, RecipeIngredientsProps } from './RecipeIngredients';
import { RecipeTags, RecipeTagsProps } from './RecipeTags';
import classes from './RecipeTemplatePage.module.scss';

type Props = Pick<
  RecipeIngredientsProps,
  'onAddIngredient' | 'onChangeIngredient' | 'onDeleteIngredient'
> &
  Pick<RecipeTagsProps, 'onAddTag' | 'onDeleteTag'> &
  Pick<
    RecipeDescriptionProps,
    | 'onNameChanged'
    | 'onAddDescriptionBlock'
    | 'onChangeDescriptionBlock'
    | 'onDeleteDescriptionBlock'
  > & {
    recipe: Recipe | NewRecipe;
    onImageChanged: (newImageId: Recipe['image_id']) => void;
    onKcalChanged: (kcal: Recipe['kcal'] | null) => void;
    onCookingTimeChanged: (
      minutes: Recipe['cooking_time_in_minutes'] | null
    ) => void;

    saveButtonLabelKey: string;
    onSave: () => void;
  };

export const RecipeTemplatePage: FC<Props> = (props) => {
  const {
    recipe,
    saveButtonLabelKey,
    onNameChanged,
    onImageChanged,
    onKcalChanged,
    onCookingTimeChanged,
    onAddIngredient,
    onChangeIngredient,
    onDeleteIngredient,
    onAddTag,
    onDeleteTag,
    onAddDescriptionBlock,
    onChangeDescriptionBlock,
    onDeleteDescriptionBlock,
    onSave,
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
        className={classes.tags}
        tags={recipe.tags}
        onAddTag={onAddTag}
        onDeleteTag={onDeleteTag}
      />

      <RecipeIngredients
        className={classes.ingredients}
        ingredients={recipe.ingredients}
        onAddIngredient={onAddIngredient}
        onChangeIngredient={onChangeIngredient}
        onDeleteIngredient={onDeleteIngredient}
      />

      <RecipeDescription
        className={classes.description}
        name={recipe.name}
        onNameChanged={onNameChanged}
        blocks={recipe.description?.blocks ?? []}
        onAddDescriptionBlock={onAddDescriptionBlock}
        onChangeDescriptionBlock={onChangeDescriptionBlock}
        onDeleteDescriptionBlock={onDeleteDescriptionBlock}
      />

      <Button className={classes.saveButton} onClick={onSave}>
        {t(saveButtonLabelKey)}
      </Button>
    </div>
  );
};
