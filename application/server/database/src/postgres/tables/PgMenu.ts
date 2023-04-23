import { QueryConfig } from 'pg';
import {
  DishInMenuEntity,
  ImageEntity,
  MenuEntity,
  MenuInScheduleEntity,
  RecipeEntity,
} from '../../entities';
import {
  MenuTable,
  MenuWithDateEntity,
  MenuWithDishesEntity,
} from '../../tables/MenuTable';
import { keyOf, MakePropertiesOptional, toIsoString } from '../../utils';
import { PgTableBase } from '../base';
import { PgDishInMenu } from './PgDishInMenu';
import { PgImage } from './PgImage';
import { PgMenuInSchedule } from './PgMenuInSchedule';
import { PgRecipe } from './PgRecipe';

export class PgMenu extends PgTableBase<MenuEntity> implements MenuTable {
  protected tableName = 'menu';
  static get table() {
    return `${this.schema}.menu`;
  }

  byScheduleIdAsync = async (
    schedule_id: number
  ): Promise<MenuWithDateEntity[]> => {
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
  };

  getWithDishesByIdAsync = async (
    id: number
  ): Promise<MenuWithDishesEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _menu.*, 
          _dish_in_menu.${keyOf<DishInMenuEntity>('recipe_id')}, 
          _recipe.${keyOf<RecipeEntity>(
            'name'
          )} as ${keyOf<MenuWithDishesEntity>('recipe_name')}, 
          _recipe.${keyOf<RecipeEntity>('description')}, 
          _recipe.${keyOf<RecipeEntity>('image_id')}, 
          _dish_in_menu.${keyOf<DishInMenuEntity>('order_number')}
        FROM ${this.table} _menu 
        LEFT JOIN ${
          PgDishInMenu.table
        } _dish_in_menu on _menu.${keyOf<MenuEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<DishInMenuEntity>('menu_id')} 
        JOIN ${
          PgRecipe.table
        } _recipe on _dish_in_menu.${keyOf<DishInMenuEntity>(
        'recipe_id'
      )} = _recipe.${keyOf<RecipeEntity>('id')} 
        LEFT JOIN ${PgImage.table} _image on _recipe.${keyOf<RecipeEntity>(
        'image_id'
      )} = _image.${keyOf<ImageEntity>('id')} 
        WHERE _menu.${keyOf<MenuEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<MenuWithDishesEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<MenuEntity, 'id'>
  ): Promise<number | undefined> => {
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
  };

  updateAsync = async (
    entity: MakePropertiesOptional<
      MenuEntity,
      'name' | 'create_date' | 'last_update' | 'author_id'
    >
  ): Promise<MenuEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<MenuEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
