import { QueryConfig } from 'pg';
import {
  DishEntity,
  DishInSetEntity,
  DishSetEntity,
  ImageEntity,
} from '../../entities';
import {
  DishSetTable,
  DishSetWithDishesEntity,
} from '../../tables/DishSetTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';
import { PgDish } from './PgDish';
import { PgDishInSet } from './PgDishInSet';
import { PgImage } from './PgImage';

export class PgDishSet
  extends PgTableBase<DishSetEntity>
  implements DishSetTable
{
  protected tableName = 'dish_set';
  static get table() {
    return `${this.schema}.dish_set`;
  }

  getWithDishesByIdAsync = async (
    id: number
  ): Promise<DishSetWithDishesEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dish_set.*, 
          _dish_in_set.${keyOf<DishSetWithDishesEntity>('dish_id')}, 
          _dish.${keyOf<DishSetWithDishesEntity>('name')} as dish_name, 
          _dish.${keyOf<DishSetWithDishesEntity>('description')}, 
          _dish.${keyOf<DishSetWithDishesEntity>('image_id')}, 
          _image.content as ${keyOf<DishSetWithDishesEntity>('image')} 
        FROM ${this.table} _dish_set 
        LEFT JOIN ${
          PgDishInSet.table
        } _dish_in_set on _dish_set.${keyOf<DishSetEntity>(
        'id'
      )} = _ds.${keyOf<DishInSetEntity>('dish_set_id')} 
        JOIN ${PgDish.table} _dish on _ds.${keyOf<DishInSetEntity>(
        'dish_id'
      )} = _dish.${keyOf<DishEntity>('id')} 
        LEFT JOIN ${PgImage.table} _image on _dish.${keyOf<DishEntity>(
        'image_id'
      )} = _image.${keyOf<ImageEntity>('id')} 
        WHERE _dish_set.${keyOf<DishSetEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<DishSetWithDishesEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (
    entity: Omit<DishSetEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<DishSetEntity>('name')}, 
          ${keyOf<DishSetEntity>('image_id')}, 
        ) 
        VALUES($1, $2) RETURNING id;
      `,
      values: [entity.name, entity.image_id],
    };

    const queryResult = await this.query<DishSetEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: MakePropertiesOptional<DishSetEntity, 'name' | 'image_id'>
  ): Promise<DishSetEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DishSetEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
