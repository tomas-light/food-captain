import { QueryConfig } from 'pg';

import {
  DishEntity,
  DishInMenuEntity,
  ImageEntity,
  MenuEntity,
  MenuInScheduleEntity,
} from '../entities';
import {
  MenuTable,
  MenuWithDateEntity,
  MenuWithDishesEntity,
} from '../MenuTable';
import { keyOf, MakePropertiesOptional, toIsoString } from '../utils';
import { PgTableBase } from './base';

export class PgMenuTable extends PgTableBase<MenuEntity> implements MenuTable {
  protected tableName = 'menu';

  async byScheduleIdAsync(schedule_id: number): Promise<MenuWithDateEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _menu.* 
        FROM ${this.tableName} _menu
        LEFT JOIN menu_in_schedule _ms on _menu.${keyOf<MenuEntity>(
          'id'
        )} = _ms.${keyOf<MenuInScheduleEntity>('menu_id')}
        WHERE _menu.${keyOf<MenuInScheduleEntity>('schedule_id')} = $1;
      `,
      values: [schedule_id],
    };

    const queryResult = await this.query<MenuWithDateEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _menu.*, 
          _dm.${keyOf<DishInMenuEntity>('dish_id')}, 
          _dish.${keyOf<DishEntity>('name')} as ${keyOf<MenuWithDishesEntity>(
        'dish_name'
      )}, 
          _dish.${keyOf<DishEntity>('description')}, 
          _dish.${keyOf<DishEntity>('image_id')}, 
          _dm.${keyOf<DishInMenuEntity>('order_number')}, 
          _image.${keyOf<ImageEntity>(
            'content'
          )} as ${keyOf<MenuWithDishesEntity>('image')} 
        FROM ${this.tableName} _menu 
        LEFT JOIN dish_in_menu _dm on _menu.${keyOf<MenuEntity>(
          'id'
        )} = _dm.${keyOf<DishInMenuEntity>('menu_id')} 
        JOIN dish _dish on _dm.${keyOf<DishInMenuEntity>(
          'dish_id'
        )} = _dish.${keyOf<DishEntity>('id')} 
        LEFT JOIN image _image on _dish.${keyOf<DishEntity>(
          'image_id'
        )} = _image.${keyOf<ImageEntity>('id')} 
        WHERE _menu.${keyOf<MenuEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<MenuWithDishesEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async insertAsync(
    entity: Omit<MenuEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<MenuEntity>('name')}, 
          ${keyOf<MenuEntity>('create_date')}, 
          ${keyOf<MenuEntity>('last_update')}, 
          ${keyOf<MenuEntity>('author_id')} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${keyOf<MenuEntity>('id')};
      `,
      values: [
        entity.name,
        toIsoString(entity.create_date),
        toIsoString(entity.last_update),
        entity.author_id,
      ],
    };

    const queryResult = await this.query<MenuEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: MakePropertiesOptional<
      MenuEntity,
      'name' | 'create_date' | 'last_update' | 'author_id'
    >
  ): Promise<MenuEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<MenuEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
