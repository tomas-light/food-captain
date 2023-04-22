import { Badge, CloseButton } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { FC, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Icon,
  IconButton,
  Image,
  NumberField,
  Option,
  SelectField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import {
  Ingredient,
  NewRecipe,
  NewTag,
  Recipe,
  RecipeIngredient,
  Tag,
} from '~/models';
import { EditableImage, GalleryModal, GalleryModalRef } from '~/templates';
import { IngredientsModal, IngredientsModalRef } from './IngredientsModal';
import classes from './RecipeTemplatePage.module.scss';

const colorSchemesMap = new Map<string | undefined, string>([
  ['#EDF2F7', 'gray'],
  ['#BEE3F8', 'blue'],
  ['#B2F5EA', 'teal'],
  ['#C6F6D5', 'green'],
  ['#FED7D7', 'red'],
  ['#E9D8FD', 'purple'],
  ['#FED7E2', 'pink'],
  ['#FEEBCB', 'orange'],
]);
const tagsColors = Array.from(colorSchemesMap.keys()) as string[];

type Props = {
  recipe: Recipe | NewRecipe;
  onNameChanged: (newName: Recipe['name']) => void;
  onImageChanged: (newImageId: Recipe['image_id']) => void;
  onKcalChanged: (kcal: Recipe['kcal'] | null) => void;
  onCookingTimeChanged: (
    minutes: Recipe['cooking_time_in_minutes'] | null
  ) => void;
  onAddIngredient: (newIngredient: RecipeIngredient) => void;
  onChangeIngredient: (changedIngredient: RecipeIngredient) => void;
  onDeleteIngredient: (ingredientId: Ingredient['id']) => void;
  saveButtonLabelKey: string;
  onAddTag: (tag: Tag | NewTag) => void;
  onDeleteTag: (tagId: Tag['id']) => void;
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
    onSave,
  } = props;

  const { t } = useTranslation();

  const ingredientsModalRef = useRef<IngredientsModalRef>(null);
  const galleryModalRef = useRef<GalleryModalRef>(null);

  useLocaleResource('recipe');
  useLocaleResource('ingredient');
  const imageApi = use(ImageApi);

  const { dimensionsMap, ingredientsMap } = useSelector(
    (state) => state.ingredient
  );
  const { tagsMap } = useSelector((state) => state.recipe);
  const [newTagName, setNewTagName] = useState('');

  const dimensionOptions = useMemo(() => {
    const optionsMap = new Map();
    const options = [] as (Option & { name: string })[];

    for (const dimension of dimensionsMap.values()) {
      const option: Option & { name: string } = {
        label: dimension.short_name ?? '<no short_name> for dimension',
        name: dimension.name,
        value: dimension.id,
      };
      optionsMap.set(dimension.id, option);
      options.push(option);
    }

    return { options, optionsMap };
  }, [dimensionsMap]);

  const tagDictionaries = useMemo(() => {
    const optionsMap = new Map<Tag['id'], Option>();
    const options = [] as Option[];

    for (const tag of tagsMap.values()) {
      const option: Option<Tag['id']> = {
        label: tag.name ?? '<no name> for tag',
        value: tag.id,
      };
      optionsMap.set(tag.id, option);
      options.push(option);
    }

    return { options, optionsMap };
  }, [tagsMap]);

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

      <div className={classes.tags}>
        <SelectField
          placeholder={t('recipe.addTag')}
          options={tagDictionaries.options}
          isSearchable={true}
          value={null} // we don't need to display selected value here
          onInputChange={(newValue) => {
            setNewTagName(newValue);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const existedColors = new Set(
                Array.from(tagsMap.values()).map((tag) => tag.color)
              );

              const newColor = tagsColors.find(
                (color) => !existedColors.has(color)
              );
              if (newColor) {
                onAddTag({
                  name: newTagName,
                  color: newColor,
                });
                setNewTagName('');
              } else {
                // todo: implement regular tag creation with color specifying (modal) ?
                throw new Error('All colors already bounded');
              }
            }
          }}
          onChange={(newTagOption) => {
            if (newTagOption) {
              const tag = tagsMap.get(newTagOption.value as Tag['id']);
              if (tag) {
                onAddTag(tag);
                setNewTagName('');
              }
            }
          }}
        />

        <div>
          {recipe.tags.map(({ tag_id }) => {
            const tag = tagsMap.get(tag_id);
            const colorScheme = colorSchemesMap.get(tag?.color);
            return (
              <Badge
                key={tag_id}
                variant={'subtle'}
                colorScheme={colorScheme}
                as={'div'}
              >
                {tag?.name}

                <CloseButton
                  size={'xs'}
                  onClick={() => {
                    onDeleteTag(tag_id);
                  }}
                />
              </Badge>
            );
          })}
        </div>
      </div>

      <div className={classes.ingredients}>
        <Typography>{t('recipe.ingredients')}</Typography>

        <IconButton
          icon={<Icon variant={'plus'} />}
          title={t('ingredient.add') ?? ''}
          onClick={() => {
            ingredientsModalRef.current?.onOpen();
          }}
        />

        <div>
          {recipe.ingredients.map(({ ingredient_id, size, dimension_id }) => {
            const ingredient = ingredientsMap.get(ingredient_id);

            return (
              <div key={ingredient_id} className={classes.ingredient}>
                <Image
                  className={classes.ingredientImage}
                  src={
                    ingredient?.image_id
                      ? imageApi.makeUrl(ingredient.image_id)
                      : undefined
                  }
                />

                <Typography className={classes.ingredientName}>
                  {ingredient?.name}
                </Typography>

                <NumberField
                  className={classes.ingredientCount}
                  placeholder={t('common.count') ?? ''}
                  size={'xs'}
                  value={size ?? 0}
                  onChange={(newSize) => {
                    onChangeIngredient({
                      ingredient_id,
                      size: newSize ?? 0,
                      dimension_id,
                    });
                  }}
                />

                <SelectField
                  className={classes.ingredientDimension}
                  value={dimensionOptions.optionsMap.get(dimension_id)}
                  options={dimensionOptions.options}
                  isSearchable
                  filterOption={(filterOption, inputValue) => {
                    if (inputValue) {
                      const searchString = inputValue.trim().toLowerCase();
                      if (filterOption.data.name.includes(searchString)) {
                        return true;
                      }
                      return false;
                    }
                    return true;
                  }}
                  onChange={(newDimension) => {
                    onChangeIngredient({
                      ingredient_id,
                      size,
                      dimension_id: newDimension?.value,
                    });
                  }}
                />

                <IconButton
                  size={'xs'}
                  className={classes.ingredientDelete}
                  icon={<Icon variant={'minus'} />}
                  onClick={() => {
                    onDeleteIngredient(ingredient_id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.description}>
        <TextField
          label={t('recipe.name')}
          value={recipe.name ?? ''}
          onChange={onNameChanged}
        />
        {/* todo: add description fields */}
      </div>

      <Button className={classes.saveButton} onClick={onSave}>
        {t(saveButtonLabelKey)}
      </Button>
    </div>
  );
};
