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
import { PgImage } from './PgImage';
import { PgIngredient } from './PgIngredient';
import { PgIngredientInSet } from './PgIngredientInSet';

export class PgIngredientSet
  extends PgTableBase<IngredientSetEntity>
  implements IngredientSetTable
{
  protected tableName = 'ingredient_set';
  static get table() {
    return `${this.schema}.ingredient_set`;
  }

  getWithIngredientsByIdAsync = async (
    id: number
  ): Promise<IngredientSetWithIngredientsEntity | undefined> => {
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
        FROM ${this.table} _set 
        LEFT JOIN ${PgImage.table} _image1 on _set.${keyOf<IngredientSetEntity>(
        'image_id'
      )} = _image1.${keyOf<ImageEntity>('id')} 
        LEFT JOIN ${
          PgIngredientInSet.table
        } _ingredient_in_set on _set.${keyOf<IngredientSetEntity>(
        'id'
      )} = _ingredient_in_set.${keyOf<IngredientInSetEntity>(
        'ingredient_set_id'
      )}
        JOIN ${
          PgIngredient.table
        } _ingredient on _ingredient_in_set.${keyOf<IngredientInSetEntity>(
        'ingredient_id'
      )} = _ingredient.${keyOf<IngredientEntity>('id')} 
        LEFT JOIN ${
          PgImage.table
        } _image2 on _ingredient.${keyOf<IngredientEntity>(
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
  };

  insertAsync = async (
    entity: Omit<IngredientSetEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<IngredientSetEntity>('name')}, 
          ${keyOf<IngredientSetEntity>('image_id')}, 
        ) 
        VALUES($1, $2) RETURNING ${keyOf<IngredientSetEntity>('id')};
      `,
      values: [entity.name, entity.image_id],
    };

    const queryResult = await this.query<IngredientSetEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: MakePropertiesOptional<IngredientSetEntity, 'name' | 'image_id'>
  ): Promise<IngredientSetWithImageEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientSetEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
