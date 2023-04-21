import { QueryConfig } from 'pg';
import {
  IngredientEntity,
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
  RecipeTagEntity,
} from '../../entities';
import { RecipeTable, RecipeForViewEntity } from '../../tables/RecipeTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';
import { PgIngredient } from './PgIngredient';
import { PgIngredientInRecipe } from './PgIngredientInRecipe';
import { PgRecipeTag } from './PgRecipeTag';

export class PgRecipe extends PgTableBase<RecipeEntity> implements RecipeTable {
  protected tableName = 'recipe';

  static get table() {
    return `${this.schema}.recipe`;
  }

  byIdsAsync = async (ids: number[]): Promise<RecipeEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<RecipeEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<RecipeEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  byIdForViewAsync = async (
    id: number
  ): Promise<RecipeForViewEntity | undefined> => {
    type RecipeWithIngredientAndTagRecipe = RecipeEntity &
      IngredientInRecipeEntity &
      RecipeTagEntity;

    const queryConfig: QueryConfig = {
      text: `
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
        WHERE _recipe.${keyOf<RecipeEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<RecipeWithIngredientAndTagRecipe>(
      queryConfig
    );

    const rows = queryResult?.rows ?? [];
    if (!rows.length) {
      return undefined;
    }

    const [firstRow] = rows;
    const recipeWithIngredients: RecipeForViewEntity = {
      id: firstRow.id,
      name: firstRow.name,
      dish_id: firstRow.dish_id,
      image_id: firstRow.image_id,
      description: firstRow.description,
      kcal: firstRow.kcal,
      cooking_time_in_minutes: firstRow.cooking_time_in_minutes,
      portion_weight_in_grams: firstRow.portion_weight_in_grams,
      ingredients: [],
      tags: [],
    };

    const ingredientMap = new Map<
      RecipeWithIngredientAndTagRecipe['ingredient_id'],
      Omit<IngredientInRecipeEntity, 'recipe_id'>
    >();
    const tagSet = new Set<RecipeWithIngredientAndTagRecipe['tag_id']>();

    rows.forEach((row) => {
      if (!ingredientMap.has(row.ingredient_id)) {
        ingredientMap.set(row.ingredient_id, {
          ingredient_id: row.ingredient_id,
          dimension_id: row.dimension_id,
          size: row.size,
        });
      }
      if (!tagSet.has(row.tag_id)) {
        tagSet.add(row.tag_id);
      }
    });

    for (const ingredient of ingredientMap.values()) {
      recipeWithIngredients.ingredients.push(ingredient);
    }
    for (const tagId of tagSet.values()) {
      recipeWithIngredients.tags.push({
        tag_id: tagId,
      });
    }

    return recipeWithIngredients;
  };

  byDishIdForViewAsync = async (
    dishId: number
  ): Promise<RecipeForViewEntity[]> => {
    type RecipeWithIngredientAndTagRecipe = RecipeEntity &
      IngredientInRecipeEntity &
      RecipeTagEntity;

    const queryConfig: QueryConfig = {
      text: `
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
        WHERE _recipe.${keyOf<RecipeEntity>('dish_id')} = $1;
      `,
      values: [dishId],
    };

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
        if (!recipe.ingredientMap.has(row.ingredient_id)) {
          recipe.ingredientMap.set(row.ingredient_id, {
            ingredient_id: row.ingredient_id,
            dimension_id: row.dimension_id,
            size: row.size,
          });
        }
        if (!recipe.tagSet.has(row.tag_id)) {
          recipe.tagSet.add(row.tag_id);
        }
      } else {
        recipesMap.set(row.id, {
          recipe: {
            id: row.id,
            name: row.name,
            dish_id: row.dish_id,
            image_id: row.image_id,
            description: row.description,
            kcal: row.kcal,
            cooking_time_in_minutes: row.cooking_time_in_minutes,
            portion_weight_in_grams: row.portion_weight_in_grams,
            ingredients: [],
            tags: [],
          },
          ingredientMap: new Map([
            [
              row.ingredient_id,
              {
                ingredient_id: row.ingredient_id,
                dimension_id: row.dimension_id,
                size: row.size,
              },
            ],
          ]),
          tagSet: new Set([row.tag_id]),
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
  };

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
          ${keyOf<RecipeEntity>('dish_id')}, 
          ${keyOf<RecipeEntity>('image_id')} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${keyOf<RecipeEntity>('id')};
      `,
      values: [
        entity.name,
        entity.description,
        entity.kcal,
        entity.cooking_time_in_minutes,
        entity.portion_weight_in_grams,
        entity.dish_id,
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
      | 'dish_id'
      | 'image_id'
      | 'kcal'
      | 'cooking_time_in_minutes'
      | 'portion_weight_in_grams'
    >
  ): Promise<RecipeEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig({
      id: entity.id,
      name: entity.name,
      dish_id: entity.dish_id,
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
