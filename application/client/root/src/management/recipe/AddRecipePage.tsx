import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocaleResource } from '~/config/i18next';
import { IngredientController } from '~/management/ingredient/redux';
import { NewRecipe, Tag } from '~/models';
import { appUrls } from '~/routing';
import { RecipeTemplatePage } from './RecipeTemplatePage';
import { RecipeController } from './redux/Recipe.controller';

export const AddRecipePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
    dispatch(RecipeController.loadTags());
  }, []);

  const [recipe, setRecipe] = useState<NewRecipe>({
    name: '',
    ingredients: [],
    tags: [],
  });

  const onSave = () => {
    dispatch(
      RecipeController.addRecipe({
        recipe,
        callback: () => navigate(appUrls.management.recipe.url()),
      })
    );
  };

  return (
    <RecipeTemplatePage
      recipe={recipe}
      onNameChanged={(newName) => {
        setRecipe((_recipe) => ({
          ..._recipe,
          name: newName,
        }));
      }}
      onImageChanged={(imageId) => {
        setRecipe((_recipe) => ({
          ..._recipe,
          image_id: imageId,
        }));
      }}
      onKcalChanged={(newKcal) => {
        setRecipe((_recipe) => ({
          ..._recipe,
          kcal: newKcal ?? undefined,
        }));
      }}
      onCookingTimeChanged={(newCookingTime) => {
        setRecipe((_recipe) => ({
          ..._recipe,
          cooking_time_in_minutes: newCookingTime ?? undefined,
        }));
      }}
      onAddIngredient={(newIngredient) => {
        setRecipe((_recipe) => ({
          ..._recipe,
          ingredients: _recipe.ingredients.concat([newIngredient]),
        }));
      }}
      onChangeIngredient={(changedIngredient) => {
        setRecipe((_recipe) => {
          const ingredientIndex = _recipe.ingredients.findIndex(
            ({ ingredient_id }) =>
              changedIngredient.ingredient_id === ingredient_id
          );
          const updatedIngredients = [..._recipe.ingredients];
          updatedIngredients.splice(ingredientIndex, 1, changedIngredient);
          return {
            ..._recipe,
            ingredients: updatedIngredients,
          };
        });
      }}
      onDeleteIngredient={(ingredientId) => {
        setRecipe((_recipe) => {
          const _ingredients = _recipe.ingredients.filter(
            ({ ingredient_id }) => ingredient_id !== ingredientId
          );

          return {
            ..._recipe,
            ingredients: _ingredients,
          };
        });
      }}
      onAddTag={async (newTag) => {
        if ('id' in newTag) {
          setRecipe((_recipe) => ({
            ..._recipe,
            tags: _recipe.tags.concat([
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
            ..._recipe,
            tags: _recipe.tags.concat([
              {
                tag_id: createdTag.id,
              },
            ]),
          }));
        }
      }}
      onDeleteTag={(tagId) => {
        setRecipe((_recipe) => {
          const tags = _recipe.tags.filter(({ tag_id }) => tag_id !== tagId);

          return {
            ..._recipe,
            tags: tags,
          };
        });
      }}
      saveButtonLabelKey={'buttons.save'}
      onSave={onSave}
    />
  );
};
