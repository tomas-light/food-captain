import { QueryConfig } from 'pg';
import {
  ImageEntity,
  IngredientEntity,
  IngredientInRecipeEntity,
  RecipeEntity,
} from '../../entities';
import {
  RecipeTable,
  RecipeWithImageEntity,
  RecipeWithIngredientsEntity,
} from '../../tables/RecipeTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';

export class PgRecipeTable
  extends PgTableBase<RecipeEntity>
  implements RecipeTable
{
  protected tableName = 'recipe';

  async getWithIngredientsByIdAsync(
    id: number
  ): Promise<RecipeWithIngredientsEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _recipe.*, 
          _image1.${keyOf<ImageEntity>('content')} as image,
          _ingredient_in_recipe.${keyOf<IngredientInRecipeEntity>(
            'ingredient_id'
          )}, 
          _ingredient_in_recipe.${keyOf<IngredientInRecipeEntity>(
            'dimension_id'
          )}, 
          _ingredient_in_recipe.${keyOf<IngredientInRecipeEntity>('size')}, 
          _ingredient.${keyOf<IngredientEntity>('name')} as ingredient_name, 
          _ingredient.${keyOf<IngredientEntity>(
            'image_id'
          )} as ingredient_image_id, 
          _image2.${keyOf<ImageEntity>('content')} as ingredient_image 
        FROM ${this.schema}.${this.tableName} _recipe 
        LEFT JOIN ${this.schema}.image _image1 on _recipe.${keyOf<RecipeEntity>(
        'image_id'
      )} = _image1.${keyOf<ImageEntity>('id')} 
        LEFT JOIN ${
          this.schema
        }.ingredient_in_recipe _ingredient_in_recipe on _recipe.${keyOf<RecipeEntity>(
        'id'
      )} = _ingredient_in_recipe.${keyOf<IngredientInRecipeEntity>(
        'recipe_id'
      )} 
        JOIN ${
          this.schema
        }.ingredient _ingredient on _ingredient_in_recipe.${keyOf<IngredientInRecipeEntity>(
        'ingredient_id'
      )} = _ingredient.${keyOf<IngredientEntity>('id')} 
        LEFT JOIN image _image2 on _ingredient.${keyOf<IngredientEntity>(
          'image_id'
        )} = _image2.${keyOf<ImageEntity>('id')} 
        WHERE _recipe.${keyOf<RecipeEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<RecipeWithIngredientsEntity>(
      queryConfig
    );
    return queryResult?.rows[0];
  }

  async insertAsync(
    entity: Omit<RecipeEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
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
  }

  async updateAsync(
    entity: MakePropertiesOptional<
      RecipeEntity,
      'name' | 'dish_id' | 'image_id'
    >
  ): Promise<RecipeWithImageEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RecipeEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
