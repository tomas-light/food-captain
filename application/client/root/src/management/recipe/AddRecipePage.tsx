import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { IngredientController } from '~/management/ingredient/redux';
import { Tag } from '~/models';
import { appUrls } from '~/routing';
import { RecipeTemplatePage } from './RecipeTemplatePage';
import { RecipeEditorController } from './redux';
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
    dispatch(RecipeEditorController.startEditingNewRecipe());
  }, []);

  const { editedRecipe } = useSelector((state) => state.recipe);

  if (!editedRecipe) {
    return null;
  }

  const onSave = () => {
    dispatch(
      RecipeController.addRecipe({
        callback: () => navigate(appUrls.management.recipe.url()),
      })
    );
  };

  return (
    <RecipeTemplatePage
      recipe={editedRecipe}
      onNameChanged={(newName) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: () => ({
              name: newName,
            }),
          })
        );
      }}
      onImageChanged={(imageId) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: () => ({
              image_id: imageId,
            }),
          })
        );
      }}
      onKcalChanged={(newKcal) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: () => ({
              kcal: newKcal ?? undefined,
            }),
          })
        );
      }}
      onCookingTimeChanged={(newCookingTime) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: () => ({
              cooking_time_in_minutes: newCookingTime ?? undefined,
            }),
          })
        );
      }}
      onAddIngredient={(newIngredient) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => ({
              ingredients: recipe.ingredients.concat([newIngredient]),
            }),
          })
        );
      }}
      onChangeIngredient={(changedIngredient) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => {
              const ingredientIndex = recipe.ingredients.findIndex(
                ({ ingredient_id }) =>
                  changedIngredient.ingredient_id === ingredient_id
              );
              const updatedIngredients = [...recipe.ingredients];
              updatedIngredients.splice(ingredientIndex, 1, changedIngredient);

              return {
                ingredients: updatedIngredients,
              };
            },
          })
        );
      }}
      onDeleteIngredient={(ingredientId) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => ({
              ingredients: recipe.ingredients.filter(
                ({ ingredient_id }) => ingredient_id !== ingredientId
              ),
            }),
          })
        );
      }}
      onAddTag={async (newTag) => {
        let tagId: Tag['id'];
        if ('id' in newTag) {
          tagId = newTag.id;
        } else {
          const createdTag = await new Promise<Tag>((resolve) => {
            dispatch(
              RecipeController.addTag({
                newTag,
                getCreatedTag: resolve,
              })
            );
          });
          tagId = createdTag.id;
        }

        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => ({
              tags: recipe.tags.concat([
                {
                  tag_id: tagId,
                },
              ]),
            }),
          })
        );
      }}
      onDeleteTag={(tagId) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => ({
              tags: recipe.tags.filter(({ tag_id }) => tag_id !== tagId),
            }),
          })
        );
      }}
      onAddDescriptionBlock={(newBlock) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => ({
              description: {
                blocks: (recipe.description?.blocks ?? []).concat([newBlock]),
              },
            }),
          })
        );
      }}
      onChangeDescriptionBlock={(changedBlock) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => {
              if (!recipe.description) {
                return {};
              }

              const blockIndex = recipe.description.blocks.findIndex(
                ({ reactId }) => changedBlock.reactId === reactId
              );
              const updatedBlocks = recipe.description.blocks.slice();
              updatedBlocks.splice(blockIndex, 1, changedBlock);
              return {
                description: {
                  blocks: updatedBlocks,
                },
              };
            },
          })
        );
      }}
      onDeleteDescriptionBlock={(deletableBlock) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => {
              if (!recipe.description) {
                return {};
              }

              const blocks = recipe.description.blocks.filter(
                ({ reactId }) => reactId !== deletableBlock.reactId
              );

              return {
                description: {
                  blocks: blocks,
                },
              };
            },
          })
        );
      }}
      saveButtonLabelKey={'buttons.save'}
      onSave={onSave}
    />
  );
};
