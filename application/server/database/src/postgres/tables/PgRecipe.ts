import { QueryConfig } from 'pg';
import {
  IngredientEntity,
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
} from '../../entities';
import {
  RecipeTable,
  RecipeWithIngredientsEntity,
} from '../../tables/RecipeTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';
import { PgIngredient } from './PgIngredient';
import { PgIngredientInRecipe } from './PgIngredientInRecipe';

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

  byIdWithIngredientsAsync = async (
    id: number
  ): Promise<RecipeWithIngredientsEntity | undefined> => {
    type RecipeWithIngredientRecipe = RecipeEntity & IngredientInRecipeEntity;

    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _recipe.*, 
          _ingredient_in_recipe.*
        FROM ${this.table} _recipe 
        LEFT JOIN ${
          PgIngredientInRecipe.table
        } _ingredient_in_recipe on _recipe.${keyOf<RecipeEntity>(
        'id'
      )} = _ingredient_in_recipe.${keyOf<RecipeWithIngredientRecipe>(
        'recipe_id'
      )} 
        JOIN ${
          PgIngredient.table
        } _ingredient on _ingredient_in_recipe.${keyOf<RecipeWithIngredientRecipe>(
        'ingredient_id'
      )} = _ingredient.${keyOf<IngredientEntity>('id')} 
        WHERE _recipe.${keyOf<RecipeEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<RecipeWithIngredientRecipe>(
      queryConfig
    );

    const rows = queryResult?.rows ?? [];
    if (!rows.length) {
      return undefined;
    }

    const [firstRow] = rows;
    const recipeWithIngredients: RecipeWithIngredientsEntity = {
      id: firstRow.id,
      name: firstRow.name,
      dish_id: firstRow.dish_id,
      image_id: firstRow.image_id,
      description: firstRow.description,
      ingredients: [],
    };

    rows.forEach((row) => {
      recipeWithIngredients.ingredients.push({
        ingredient_id: row.ingredient_id,
        dimension_id: row.dimension_id,
        size: row.size,
      });
    });

    return recipeWithIngredients;
  };

  byDishIdWithIngredientsAsync = async (
    dishId: number
  ): Promise<RecipeWithIngredientsEntity | undefined> => {
    type RecipeWithIngredientRecipe = RecipeEntity & IngredientInRecipeEntity;

    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _recipe.*, 
          _ingredient_in_recipe.*
        FROM ${this.table} _recipe 
        LEFT JOIN ${
          PgIngredientInRecipe.table
        } _ingredient_in_recipe on _recipe.${keyOf<RecipeEntity>(
        'id'
      )} = _ingredient_in_recipe.${keyOf<RecipeWithIngredientRecipe>(
        'recipe_id'
      )} 
        JOIN ${
          PgIngredient.table
        } _ingredient on _ingredient_in_recipe.${keyOf<RecipeWithIngredientRecipe>(
        'ingredient_id'
      )} = _ingredient.${keyOf<IngredientEntity>('id')} 
        WHERE _recipe.${keyOf<RecipeEntity>('dish_id')} = $1;
      `,
      values: [dishId],
    };

    const queryResult = await this.query<RecipeWithIngredientRecipe>(
      queryConfig
    );

    const rows = queryResult?.rows ?? [];
    if (!rows.length) {
      return undefined;
    }

    const [firstRow] = rows;
    const recipeWithIngredients: RecipeWithIngredientsEntity = {
      id: firstRow.id,
      name: firstRow.name,
      dish_id: firstRow.dish_id,
      image_id: firstRow.image_id,
      description: firstRow.description,
      ingredients: [],
    };

    rows.forEach((row) => {
      recipeWithIngredients.ingredients.push({
        ingredient_id: row.ingredient_id,
        dimension_id: row.dimension_id,
        size: row.size,
      });
    });

    return recipeWithIngredients;
  };

  insertAsync = async (
    entity: NewRecipeEntity
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<RecipeEntity>('name')}, 
          ${keyOf<RecipeEntity>('description')}, 
          ${keyOf<RecipeEntity>('dish_id')}, 
          ${keyOf<RecipeEntity>('image_id')} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${keyOf<RecipeEntity>('id')};
      `,
      values: [
        entity.name,
        entity.description,
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
      'name' | 'dish_id' | 'image_id'
    >
  ): Promise<RecipeEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RecipeEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
