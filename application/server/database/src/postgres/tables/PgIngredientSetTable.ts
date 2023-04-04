import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../../utils';
import {
  ImageEntity,
  IngredientEntity,
  IngredientInSetEntity,
  IngredientSetEntity,
} from '../../entities';
import {
  IngredientSetTable,
  IngredientSetWithImageEntity,
  IngredientSetWithIngredientsEntity,
} from '../../tables/IngredientSetTable';
import { PgTableBase } from '../base';

export class PgIngredientSetTable
  extends PgTableBase<IngredientSetEntity>
  implements IngredientSetTable
{
  protected tableName = 'ingredient_set';

  async getWithIngredientsByIdAsync(
    id: number
  ): Promise<IngredientSetWithIngredientsEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _set.*, 
          _image1.${keyOf<ImageEntity>(
            'content'
          )} as ${keyOf<IngredientSetWithIngredientsEntity>('image')},
          _ingredient_in_set.${keyOf<IngredientInSetEntity>('ingredient_id')}, 
          _ingredient.${keyOf<IngredientEntity>(
            'name'
          )} as ${keyOf<IngredientSetWithIngredientsEntity>(
        'ingredient_name'
      )}, 
          _ingredient.${keyOf<IngredientEntity>(
            'image_id'
          )} as ${keyOf<IngredientSetWithIngredientsEntity>(
        'ingredient_image_id'
      )}, 
          _image2.${keyOf<ImageEntity>(
            'content'
          )} as ${keyOf<IngredientSetWithIngredientsEntity>(
        'ingredient_image'
      )} 
        FROM ${this.schema}.${this.tableName} _set 
        LEFT JOIN ${
          this.schema
        }.image _image1 on _set.${keyOf<IngredientSetEntity>(
        'image_id'
      )} = _image1.${keyOf<ImageEntity>('id')} 
        LEFT JOIN ${
          this.schema
        }.ingredient_in_set _ingredient_in_set on _set.${keyOf<IngredientSetEntity>(
        'id'
      )} = _ingredient_in_set.${keyOf<IngredientInSetEntity>(
        'ingredient_set_id'
      )} JOIN ${
        this.schema
      }.ingredient _ingredient on _ingredient_in_set.${keyOf<IngredientInSetEntity>(
        'ingredient_id'
      )} = _ingredient.${keyOf<IngredientEntity>('id')} 
        LEFT JOIN ${
          this.schema
        }.image _image2 on _ingredient.${keyOf<IngredientEntity>(
        'image_id'
      )} = _image2.${keyOf<ImageEntity>('id')} 
        WHERE _set.${keyOf<IngredientSetEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<IngredientSetWithIngredientsEntity>(
      queryConfig
    );
    return queryResult?.rows[0];
  }

  async insertAsync(
    entity: Omit<IngredientSetEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<IngredientSetEntity>('name')}, 
          ${keyOf<IngredientSetEntity>('image_id')}, 
        ) 
        VALUES($1, $2) RETURNING ${keyOf<IngredientSetEntity>('id')};
      `,
      values: [entity.name, entity.image_id],
    };

    const queryResult = await this.query<IngredientSetEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: MakePropertiesOptional<IngredientSetEntity, 'name' | 'image_id'>
  ): Promise<IngredientSetWithImageEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientSetEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
