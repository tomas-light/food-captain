import { QueryConfig } from 'pg';
import {
  DishInMenuEntity,
  IngredientEntity,
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
  RecipeTagEntity,
} from '../../entities';
import {
  RecipeTable,
  RecipeForViewEntity,
  RecipeFilters,
} from '../../tables/RecipeTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';
import { PgDishInMenu } from './PgDishInMenu';
import { PgIngredient } from './PgIngredient';
import { PgIngredientInRecipe } from './PgIngredientInRecipe';
import { PgRecipeTag } from './PgRecipeTag';

type RecipeWithIngredientAndTagRecipe = RecipeEntity &
  IngredientInRecipeEntity &
  RecipeTagEntity;

export class PgRecipe extends PgTableBase<RecipeEntity> implements RecipeTable {
  protected tableName = 'recipe';

  static get table() {
    return `${this.schema}.recipe`;
  }

  private prepareQueryForView() {
    return `
        SELECT 
          _recipe.*, 
          _recipe_tag.${keyOf<RecipeTagEntity>('tag_id')}, 
          _ingredient_in_recipe.*
        FROM ${this.table} _recipe 
        LEFT JOIN ${
          PgIngredientInRecipe.table
        } _ingredient_in_recipe on _recipe.${keyOf<RecipeEntity>(
      'id'
    )} = _ingredient_in_recipe.${keyOf<RecipeWithIngredientAndTagRecipe>(
      'recipe_id'
    )} 
        LEFT JOIN ${
          PgRecipeTag.table
        } _recipe_tag on _recipe.${keyOf<RecipeEntity>(
      'id'
    )} = _recipe_tag.${keyOf<RecipeWithIngredientAndTagRecipe>('recipe_id')} 
        JOIN ${
          PgIngredient.table
        } _ingredient on _ingredient_in_recipe.${keyOf<RecipeWithIngredientAndTagRecipe>(
      'ingredient_id'
    )} = _ingredient.${keyOf<IngredientEntity>('id')}
    `;
  }

  allAsync = async (): Promise<RecipeForViewEntity[]> => {
    const queryConfig: QueryConfig = {
      text: this.prepareQueryForView(),
    };

    return await this.getRecipeForViewEntitiesByQuery(queryConfig);
  };

  filterAsync = async (
    filters: RecipeFilters
  ): Promise<RecipeForViewEntity[]> => {
    const conditions: string[] = [];
    const values: any[] = [];

    if (<keyof RecipeFilters>'tagIds' in filters) {
      values.push(filters.tagIds);
      conditions.push(`
        _recipe.${keyOf<RecipeEntity>('id')} in (
            select ${PgRecipeTag.table}.${keyOf<RecipeTagEntity>('recipe_id')}
            from ${PgRecipeTag.table}
            where ${PgRecipeTag.table}.${keyOf<RecipeTagEntity>('tag_id')}
              = ANY($${values.length}::int4[])
          )
      `);
    }

    if (<keyof RecipeFilters>'excludedIngredientIds' in filters) {
      values.push(filters.excludedIngredientIds);
      conditions.push(`
        _recipe.${keyOf<RecipeEntity>('id')} not in (
            select ${
              PgIngredientInRecipe.table
            }.${keyOf<IngredientInRecipeEntity>('recipe_id')}
            from ${PgIngredientInRecipe.table}
            where ${
              PgIngredientInRecipe.table
            }.${keyOf<IngredientInRecipeEntity>('ingredient_id')}
              = ANY($${values.length}::int4[])
          )
      `);
    }

    if (<keyof RecipeFilters>'includedIngredientIds' in filters) {
      values.push(filters.includedIngredientIds);
      conditions.push(`
        _recipe.${keyOf<RecipeEntity>('id')} in (
            select ${
              PgIngredientInRecipe.table
            }.${keyOf<IngredientInRecipeEntity>('recipe_id')}
            from ${PgIngredientInRecipe.table}
            where ${
              PgIngredientInRecipe.table
            }.${keyOf<IngredientInRecipeEntity>('ingredient_id')}
              = ANY($${values.length}::int4[])
          )
      `);
    }

    if (<keyof RecipeFilters>'kcalLimit' in filters) {
      values.push(filters.kcalLimit);
      conditions.push(`
        _recipe.${keyOf<RecipeEntity>('kcal')} <= ${values.length}
      `);
    }

    if (<keyof RecipeFilters>'cookingTimeLimit' in filters) {
      values.push(filters.cookingTimeLimit);
      conditions.push(`
        _recipe.${keyOf<RecipeEntity>('cooking_time_in_minutes')} <= ${
        values.length
      }
      `);
    }

    const queryConfig: QueryConfig = {
      text: `
        ${this.prepareQueryForView()}
        ${conditions.length === 0 ? '' : `where ${conditions.join(' and ')}`}
        ;
      `,
      values,
    };

    return await this.getRecipeForViewEntitiesByQuery(queryConfig);
  };

  byIdAsync = async (id: number): Promise<RecipeForViewEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        ${this.prepareQueryForView()}
        WHERE _recipe.${keyOf<RecipeEntity>('id')} = $1;
      `,
      values: [id],
    };

    const recipes = await this.getRecipeForViewEntitiesByQuery(queryConfig);
    return recipes[0];
  };

  byIdsAsync = async (ids: number[]): Promise<RecipeForViewEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        ${this.prepareQueryForView()}
        WHERE ${keyOf<RecipeEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const recipes = await this.getRecipeForViewEntitiesByQuery(queryConfig);
    return recipes;
  };

  byMenuIdAsync = async (menu_id: number): Promise<RecipeForViewEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        ${this.prepareQueryForView()}
        LEFT JOIN ${
          PgDishInMenu.table
        } _dish_in_menu on _recipe.${keyOf<RecipeEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<RecipeWithIngredientAndTagRecipe>(
        'recipe_id'
      )} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const recipes = await this.getRecipeForViewEntitiesByQuery(queryConfig);
    return recipes;
  };

  // todo: check carefully, not sure if it will work
  byMenuIdsAsync = async (
    menu_ids: number[]
  ): Promise<RecipeForViewEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        ${this.prepareQueryForView()}
        LEFT JOIN ${
          PgDishInMenu.table
        } _dish_in_menu on _recipe.${keyOf<RecipeEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<RecipeWithIngredientAndTagRecipe>(
        'recipe_id'
      )} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} in ($1);
      `,
      values: menu_ids,
    };

    const recipes = await this.getRecipeForViewEntitiesByQuery(queryConfig);
    return recipes;
  };

  private async getRecipeForViewEntitiesByQuery(queryConfig: QueryConfig) {
    const queryResult = await this.query<RecipeWithIngredientAndTagRecipe>(
      queryConfig
    );

    const rows = queryResult?.rows ?? [];
    if (!rows.length) {
      return [];
    }

    const recipesMap = new Map<
      RecipeForViewEntity['id'],
      {
        recipe: RecipeForViewEntity;
        ingredientMap: Map<
          RecipeWithIngredientAndTagRecipe['ingredient_id'],
          Omit<IngredientInRecipeEntity, 'recipe_id'>
        >;
        tagSet: Set<RecipeWithIngredientAndTagRecipe['tag_id']>;
      }
    >();

    rows.forEach((row) => {
      const recipe = recipesMap.get(row.id);
      if (recipe) {
        if (
          row.ingredient_id != null &&
          !recipe.ingredientMap.has(row.ingredient_id)
        ) {
          recipe.ingredientMap.set(row.ingredient_id, {
            ingredient_id: row.ingredient_id,
            dimension_id: row.dimension_id,
            size: row.size,
          });
        }
        if (row.tag_id != null && !recipe.tagSet.has(row.tag_id)) {
          recipe.tagSet.add(row.tag_id);
        }
      } else {
        recipesMap.set(row.id, {
          recipe: {
            id: row.id,
            name: row.name,
            image_id: row.image_id,
            description: row.description,
            kcal: row.kcal,
            cooking_time_in_minutes: row.cooking_time_in_minutes,
            portion_weight_in_grams: row.portion_weight_in_grams,
            ingredients: [],
            tags: [],
          },
          ingredientMap: new Map(
            row.ingredient_id != null
              ? [
                  [
                    row.ingredient_id,
                    {
                      ingredient_id: row.ingredient_id,
                      dimension_id: row.dimension_id,
                      size: row.size,
                    },
                  ],
                ]
              : []
          ),
          tagSet: new Set(row.tag_id != null ? [row.tag_id] : []),
        });
      }
    });

    const recipes: RecipeForViewEntity[] = [];

    for (const { recipe, tagSet, ingredientMap } of recipesMap.values()) {
      for (const ingredient of ingredientMap.values()) {
        recipe.ingredients.push(ingredient);
      }
      for (const tagId of tagSet.values()) {
        recipe.tags.push({
          tag_id: tagId,
        });
      }
      recipes.push(recipe);
    }

    return recipes;
  }

  insertAsync = async (
    entity: NewRecipeEntity
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<RecipeEntity>('name')}, 
          ${keyOf<RecipeEntity>('description')}, 
          ${keyOf<RecipeEntity>('kcal')}, 
          ${keyOf<RecipeEntity>('cooking_time_in_minutes')}, 
          ${keyOf<RecipeEntity>('portion_weight_in_grams')}, 
          ${keyOf<RecipeEntity>('image_id')} 
        ) 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING ${keyOf<RecipeEntity>('id')};
      `,
      values: [
        entity.name,
        entity.description,
        entity.kcal,
        entity.cooking_time_in_minutes,
        entity.portion_weight_in_grams,
        entity.image_id,
      ],
    };

    const queryResult = await this.query<RecipeEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: MakePropertiesOptional<
      RecipeEntity,
      | 'name'
      | 'image_id'
      | 'kcal'
      | 'cooking_time_in_minutes'
      | 'portion_weight_in_grams'
    >
  ): Promise<RecipeEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig({
      id: entity.id,
      name: entity.name,
      image_id: entity.image_id,
      description: entity.description,
      kcal: entity.kcal,
      cooking_time_in_minutes: entity.cooking_time_in_minutes,
      portion_weight_in_grams: entity.portion_weight_in_grams,
    });
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RecipeEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
