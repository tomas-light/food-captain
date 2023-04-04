import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { DishTable, MenuDishesEntity } from '../../tables/DishTable';
import { DishEntity, DishInMenuEntity } from '../../entities';
import { PgTableBase } from '../base';

export class PgDishTable extends PgTableBase<DishEntity> implements DishTable {
  protected tableName = 'dish';

  async byMenuIdAsync(menuId: number): Promise<MenuDishesEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dish_in_menu.${keyOf<DishInMenuEntity>('menu_id')},
          _dish.*, 
          _dish_in_menu.${keyOf<DishInMenuEntity>('order_number')} 
        FROM ${this.schema}.${this.tableName} _dish
        JOIN ${
          this.schema
        }.dish_in_menu _dish_in_menu on _dish.${keyOf<DishEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<DishInMenuEntity>('dish_id')}
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} == $1;
      `,
      values: [menuId],
    };

    const queryResult = await this.query<MenuDishesEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async byMenuIdsAsync(menuIds: number[]): Promise<MenuDishesEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dish_in_menu.${keyOf<DishInMenuEntity>('menu_id')},
          _dish.*, 
          _dish_in_menu.${keyOf<DishInMenuEntity>('order_number')} 
        FROM ${this.schema}.${this.tableName} _dish
        JOIN ${
          this.schema
        }.dish_in_menu _dish_in_menu on _dish.${keyOf<DishEntity>(
        'id'
      )} = _dish_in_menu.${keyOf<DishInMenuEntity>('dish_id')}
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} in ($1);
      `,
      values: menuIds,
    };

    const queryResult = await this.query<MenuDishesEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async insertAsync(
    entity: Omit<DishEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<DishEntity>('name')}, 
          ${keyOf<DishEntity>('description')}, 
          ${keyOf<DishEntity>('image_id')} 
        ) 
        VALUES($1, $2, $3) RETURNING ${keyOf<DishEntity>('id')};
      `,
      values: [entity.name, entity.description, entity.image_id],
    };

    const queryResult = await this.query<DishEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: MakePropertiesOptional<DishEntity, 'name'>
  ): Promise<DishEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DishEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
