import { QueryConfig } from 'pg';
import {
  DishEntity,
  DishInMenuEntity,
  ImageEntity,
  MenuEntity,
  MenuInScheduleEntity,
} from '../../entities';
import {
  MenuTable,
  MenuWithDateEntity,
  MenuWithDishesEntity,
} from '../../tables/MenuTable';
import { keyOf, MakePropertiesOptional, toIsoString } from '../../utils';
import { PgTableBase } from '../base';
import { PgDish } from './PgDish';
import { PgDishInMenu } from './PgDishInMenu';
import { PgImage } from './PgImage';
import { PgMenuInSchedule } from './PgMenuInSchedule';

export class PgMenu extends PgTableBase<MenuEntity> implements MenuTable {
  protected tableName = 'menu';
  static get table() {
    return `${this.schema}.menu`;
  }

  async byScheduleIdAsync(schedule_id: number): Promise<MenuWithDateEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _menu.* 
        FROM ${this.table} _menu
        LEFT JOIN ${PgMenuInSchedule.table} _ms on _menu.${keyOf<MenuEntity>(
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
          _dish_in_menu.${keyOf<DishInMenuEntity>('dish_id')}, 
          _dish.${keyOf<DishEntity>('name')} as ${keyOf<MenuWithDishesEntity>(
        'dish_name'
      )}, 
          _dish.${keyOf<DishEntity>('description')}, 
          _dish.${keyOf<DishEntity>('image_id')}, 
          _dish_in_menu.${keyOf<DishInMenuEntity>('order_number')}, 
          _image.${keyOf<ImageEntity>(
            'content'
          )} as ${keyOf<MenuWithDishesEntity>('image')} 
        FROM ${this.table} _menu 
        LEFT JOIN ${
          PgDishInMenu.table
        } _dish_in_menu on _menu.${keyOf<MenuEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<DishInMenuEntity>('menu_id')} 
        JOIN ${PgDish.table} _dish on _dish_in_menu.${keyOf<DishInMenuEntity>(
        'dish_id'
      )} = _dish.${keyOf<DishEntity>('id')} 
        LEFT JOIN ${PgImage.table} _image on _dish.${keyOf<DishEntity>(
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
        INSERT INTO ${this.table} (
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
