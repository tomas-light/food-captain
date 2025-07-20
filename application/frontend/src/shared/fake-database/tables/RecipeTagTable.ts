import type { Database } from '../../database';
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
}) {
  const { database } = options;

  const recipeTags: RecipeTagTableEntity[] = [
    create(11, 8),
    create(11, 3),
    create(13, 3),
  ];

  function create(
    recipe_id: RecipeTableEntity['id'],
    tag_id: TagTableEntity['id']
  ): RecipeTagTableEntity {
    return {
      recipe_id,
      tag_id,
    };
  }

  return {
    saveRecipeTags: () => {
      recipeTags.forEach((recipeTag) => {
        const key: RecipeTagTableCompositeId = `${recipeTag.recipe_id}:${recipeTag.tag_id}`;
        void database.recipeTag.insert(key, recipeTag);
      });
    },
  };
}
