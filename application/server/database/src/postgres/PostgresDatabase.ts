import { Logger, metadata } from '@food-captain/server-utils';
import { Pool } from 'pg';
import { Database } from '../Database';
import {
  PgDimensionTable,
  PgDishInMenuTable,
  PgDishInSetTable,
  PgDishSetTable,
  PgDishTable,
  PgImageTable,
  PgIngredientInRecipeTable,
  PgIngredientInSetTable,
  PgIngredientSetTable,
  PgIngredientTable,
  PgMenuInScheduleTable,
  PgMenuTable,
  PgRecipeImageTable,
  PgRecipeTable,
  PgRoleTable,
  PgScheduleTable,
  PgUserRoleTable,
  PgUserTable,
} from './tables';

@metadata
export class PostgresDatabase extends Database {
  constructor(private readonly logger: Logger, private readonly pool: Pool) {
    if (logger) {
      console.log('has logger');
    } else {
      console.log('has NO logger');
    }
    super(
      new PgDimensionTable(logger, pool),
      new PgDishTable(logger, pool),
      new PgDishInMenuTable(logger, pool),
      new PgDishInSetTable(logger, pool),
      new PgDishSetTable(logger, pool),
      new PgImageTable(logger, pool),
      new PgIngredientTable(logger, pool),
      new PgIngredientInSetTable(logger, pool),
      new PgIngredientSetTable(logger, pool),
      new PgMenuTable(logger, pool),
      new PgMenuInScheduleTable(logger, pool),
      new PgRecipeTable(logger, pool),
      new PgRecipeImageTable(logger, pool),
      new PgIngredientInRecipeTable(logger, pool),
      new PgRoleTable(logger, pool),
      new PgScheduleTable(logger, pool),
      new PgUserTable(logger, pool),
      new PgUserRoleTable(logger, pool)
    );
  }
}
