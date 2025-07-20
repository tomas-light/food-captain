import { faker } from '@faker-js/faker';
import type { Database } from '../../database';
import type { IngredientTableEntity } from './IngredientTable.entity';
import type { RecipeTableEntity } from './RecipeTable.entity';
import type { RecipeTagTableEntity } from './RecipeTagTable.entity';
import type { TagTableEntity } from './TagTable.entity';

type RecipeTagTableCompositeId =
  `${RecipeTagTableEntity['recipe_id']}:${RecipeTagTableEntity['tag_id']}`;

export interface RecipeTagTable {
  key: RecipeTagTableCompositeId;
  value: RecipeTagTableEntity;
}

export function initRecipeTagTable(options: {
  database: Database<{
    recipeTag: RecipeTagTable;
  }>;
  recipes: RecipeTableEntity[];
  tags: TagTableEntity[];
}) {
  const { database, recipes, tags } = options;

  const recipeTags: RecipeTagTableEntity[] = [];

  recipes.forEach((recipe) => {
    const randomTags = faker.helpers.arrayElements(tags, {
      min: 1,
      max: tags.length,
    });

    randomTags.forEach((tag) => {
      recipeTags.push({
        recipe_id: recipe.id,
        tag_id: tag.id,
      });
    });
  });

  return {
    saveRecipeTags: () => {
      recipeTags.forEach((recipeTag) => {
        const key: RecipeTagTableCompositeId = `${recipeTag.recipe_id}:${recipeTag.tag_id}`;
        void database.recipeTag.insert(key, recipeTag);
      });
    },
  };
}
