import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { Tag } from '~/models';
import { RecipeTemplatePage } from './RecipeTemplatePage';
import { RecipeEditorController } from './redux';
import { RecipeController } from './redux/Recipe.controller';

type Props = {
  onSave: () => void;
};

export const RecipeEditor: FC<Props> = (props) => {
  const { onSave } = props;

  const dispatch = useDispatch();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  const { editedRecipe } = useSelector((state) => state.recipe);

  if (!editedRecipe) {
    return null;
  }

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
            updates: (recipe) => {
              const tagIdSet = new Set(recipe.tags.map((tag) => tag.tag_id));
              if (tagIdSet.has(tagId)) {
                return {};
              }

              return {
                tags: recipe.tags.concat([
                  {
                    tag_id: tagId,
                  },
                ]),
              };
            },
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
      onChangeDescriptionBlocks={(changedBlocks) => {
        dispatch(
          RecipeEditorController.onChangeEditedRecipe({
            updates: (recipe) => {
              if (!recipe.description) {
                return {};
              }

              const updatedBlocks = recipe.description.blocks.slice();
              changedBlocks.forEach((block) => {
                const blockIndex = recipe.description!.blocks.findIndex(
                  ({ reactId }) => block.reactId === reactId
                );
                updatedBlocks.splice(blockIndex, 1, block);
              });

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
