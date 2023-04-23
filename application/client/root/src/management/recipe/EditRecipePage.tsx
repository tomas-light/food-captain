import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { IngredientController } from '~/management/ingredient/redux';
import { RecipeTemplatePage } from '~/management/recipe/RecipeTemplatePage/RecipeTemplatePage';
import { Tag, UpdatedRecipe } from '~/models';
import { appUrls } from '~/routing/appUrls';
import { RecipeController } from './redux/Recipe.controller';
import { useRecipe } from './useRecipe';

export const EditRecipePage = () => {
  const { recipeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
    dispatch(RecipeController.loadTags());
  }, []);

  const loadedRecipe = useRecipe(recipeId);
  const [recipe, setRecipe] = useState<UpdatedRecipe | undefined>(loadedRecipe);

  const onSave = () => {
    if (recipe) {
      dispatch(
        RecipeController.updateRecipe({
          recipe,
          callback: () => navigate(appUrls.management.recipe.url()),
        })
      );
    }
  };

  if (!recipe) {
    return <Typography>Dish recipe not found (id: {recipeId})</Typography>;
  }

  return (
    <RecipeTemplatePage
      recipe={recipe}
      onNameChanged={(newName) => {
        setRecipe((_recipe) => ({
          ..._recipe!,
          name: newName,
        }));
      }}
      onImageChanged={(imageId) => {
        setRecipe((_recipe) => ({
          ..._recipe!,
          image_id: imageId,
        }));
      }}
      onKcalChanged={(newKcal) => {
        setRecipe((_recipe) => ({
          ..._recipe!,
          kcal: newKcal ?? undefined,
        }));
      }}
      onCookingTimeChanged={(newCookingTime) => {
        setRecipe((_recipe) => ({
          ..._recipe!,
          cooking_time_in_minutes: newCookingTime ?? undefined,
        }));
      }}
      onAddIngredient={(newIngredient) => {
        setRecipe((_recipe) => ({
          ..._recipe!,
          ingredients: _recipe!.ingredients.concat([newIngredient]),
        }));
      }}
      onChangeIngredient={(changedIngredient) => {
        setRecipe((_recipe) => {
          const ingredientIndex = _recipe!.ingredients.findIndex(
            ({ ingredient_id }) =>
              changedIngredient.ingredient_id === ingredient_id
          );
          const updatedIngredients = [..._recipe!.ingredients];
          updatedIngredients.splice(ingredientIndex, 1, changedIngredient);
          return {
            ..._recipe!,
            ingredients: updatedIngredients,
          };
        });
      }}
      onDeleteIngredient={(ingredientId) => {
        setRecipe((_recipe) => {
          const _ingredients = _recipe!.ingredients.filter(
            ({ ingredient_id }) => ingredient_id !== ingredientId
          );

          return {
            ..._recipe!,
            ingredients: _ingredients,
          };
        });
      }}
      onAddTag={async (newTag) => {
        if ('id' in newTag) {
          setRecipe((_recipe) => ({
            ..._recipe!,
            tags: _recipe!.tags.concat([
              {
                tag_id: newTag.id,
              },
            ]),
          }));
        } else {
          const createdTag = await new Promise<Tag>((resolve) => {
            dispatch(
              RecipeController.addTag({
                newTag,
                getCreatedTag: resolve,
              })
            );
          });
          setRecipe((_recipe) => ({
            ..._recipe!,
            tags: _recipe!.tags.concat([
              {
                tag_id: createdTag.id,
              },
            ]),
          }));
        }
      }}
      onDeleteTag={(tagId) => {
        setRecipe((_recipe) => {
          const tags = _recipe!.tags.filter(({ tag_id }) => tag_id !== tagId);

          return {
            ..._recipe!,
            tags: tags,
          };
        });
      }}
      onAddDescriptionBlock={(newBlock) => {
        setRecipe((_recipe) => {
          if (!_recipe?.description) {
            return _recipe;
          }

          return {
            ..._recipe,
            description: {
              blocks: (_recipe.description?.blocks ?? []).concat([newBlock]),
            },
          };
        });
      }}
      onChangeDescriptionBlock={(changedBlock) => {
        setRecipe((_recipe) => {
          if (!_recipe?.description) {
            return _recipe;
          }

          const blockIndex = _recipe.description.blocks.findIndex(
            ({ reactId }) => changedBlock.reactId === reactId
          );
          const updatedBlocks = _recipe.description.blocks.slice();
          updatedBlocks.splice(blockIndex, 1, changedBlock);
          return {
            ..._recipe,
            description: {
              blocks: updatedBlocks,
            },
          };
        });
      }}
      onDeleteDescriptionBlock={(deletableBlock) => {
        setRecipe((_recipe) => {
          if (!_recipe?.description) {
            return _recipe;
          }

          const blocks = _recipe.description.blocks.filter(
            ({ reactId }) => reactId !== deletableBlock.reactId
          );

          return {
            ..._recipe,
            description: {
              blocks: blocks,
            },
          };
        });
      }}
      saveButtonLabelKey={'buttons.save'}
      onSave={onSave}
    />
  );
};
