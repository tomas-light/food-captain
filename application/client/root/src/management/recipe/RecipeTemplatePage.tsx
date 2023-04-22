import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { guid } from '@food-captain/client-utils';
import {
  Button,
  Icon,
  IconButton,
  NumberField,
  TextField,
  TextAreaField,
  Typography,
} from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import {
  NewRecipe,
  Recipe,
  RecipeDescriptionBlock,
  RecipeIngredient,
} from '~/models';
import { EditableImage, GalleryModal, GalleryModalRef } from '~/templates';
import { IngredientsModal, IngredientsModalRef } from './IngredientsModal';
import { RecipeIngredients, RecipeIngredientsProps } from './RecipeIngredients';
import { RecipeTags, RecipeTagsProps } from './RecipeTags';
import classes from './RecipeTemplatePage.module.scss';

type Props = Pick<
  RecipeIngredientsProps,
  'onChangeIngredient' | 'onDeleteIngredient'
> &
  Pick<RecipeTagsProps, 'onAddTag' | 'onDeleteTag'> & {
    recipe: Recipe | NewRecipe;
    onNameChanged: (newName: Recipe['name']) => void;
    onImageChanged: (newImageId: Recipe['image_id']) => void;
    onKcalChanged: (kcal: Recipe['kcal'] | null) => void;
    onCookingTimeChanged: (
      minutes: Recipe['cooking_time_in_minutes'] | null
    ) => void;
    onAddIngredient: (newIngredient: RecipeIngredient) => void;

    onAddDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
    onChangeDescriptionBlock: (
      descriptionBlock: RecipeDescriptionBlock
    ) => void;
    onDeleteDescriptionBlock: (
      descriptionBlock: RecipeDescriptionBlock
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

  const ingredientsModalRef = useRef<IngredientsModalRef>(null);
  const galleryModalRef = useRef<GalleryModalRef>(null);

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  const { dimensionsMap } = useSelector((state) => state.ingredient);

  return (
    <div className={classes.root}>
      <IngredientsModal
        addedIngredients={recipe.ingredients}
        onChoose={(ingredientId) => {
          const [anyDimension] = dimensionsMap.values();

          onAddIngredient({
            ingredient_id: ingredientId,
            dimension_id: anyDimension.id,
            size: 0,
          });
        }}
        ref={ingredientsModalRef}
      />
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
        tags={recipe.tags}
        onAddTag={onAddTag}
        onDeleteTag={onDeleteTag}
      />

      <div className={classes.ingredients}>
        <Typography>{t('recipe.ingredients')}</Typography>

        <IconButton
          icon={<Icon variant={'plus'} />}
          title={t('ingredient.add') ?? ''}
          onClick={() => {
            ingredientsModalRef.current?.onOpen();
          }}
        />

        <RecipeIngredients
          ingredients={recipe.ingredients}
          onChangeIngredient={onChangeIngredient}
          onDeleteIngredient={onDeleteIngredient}
        />
      </div>

      <div className={classes.description}>
        <TextField
          label={t('recipe.name')}
          value={recipe.name ?? ''}
          onChange={onNameChanged}
          icon={<Icon variant={'title'} />}
          variant={'flushed'}
        />

        {(recipe.description?.blocks ?? []).map((block) => {
          switch (block.type) {
            case 'step':
            case 'text':
              return (
                <TextAreaField
                  key={block.reactId}
                  label={t('recipe.instruction')}
                  value={block.content ?? ''}
                  onChange={(newValue) => {
                    onChangeDescriptionBlock({
                      ...block,
                      content: newValue,
                    });
                  }}
                  // icon={<Icon variant={'title'} />}
                />
              );

            default:
              return (
                <TextAreaField
                  key={block.reactId}
                  label={t('recipe.instruction')}
                  value={block.content ?? ''}
                  onChange={(newValue) => {
                    onChangeDescriptionBlock({
                      ...block,
                      content: newValue,
                    });
                  }}
                  // icon={<Icon variant={'title'} />}
                />
              );
          }
        })}

        <Menu>
          <MenuButton
            as={IconButton}
            className={classes.addDescriptionButton}
            title={t('buttons.add') ?? ''}
          >
            <Icon variant={'plus'} />
          </MenuButton>

          <MenuList>
            <MenuItem
              onClick={() => {
                onAddDescriptionBlock({
                  type: 'text',
                  reactId: guid(),
                  content: '',
                  order: recipe.description?.blocks.length ?? 0,
                });
              }}
            >
              {t('recipe.addTextDescription')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onAddDescriptionBlock({
                  type: 'step',
                  reactId: guid(),
                  content: '',
                  order: recipe.description?.blocks.length ?? 0,
                });
              }}
            >
              {t('recipe.addStepDescription')}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <Button className={classes.saveButton} onClick={onSave}>
        {t(saveButtonLabelKey)}
      </Button>
    </div>
  );
};
