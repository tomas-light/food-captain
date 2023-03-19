import { Logger, metadata } from '@food-captain/server-utils';
import { Pool } from 'pg';
import { Database } from '../Database';
import { PgDimensionTable } from './PgDimensionTable';
import { PgDishInMenuTable } from './PgDishInMenuTable';
import { PgDishInSetTable } from './PgDishInSetTable';
import { PgDishSetTable } from './PgDishSetTable';
import { PgDishTable } from './PgDishTable';
import { PgImageTable } from './PgImageTable';
import { PgIngredientInRecipeTable } from './PgIngredientInRecipeTable';
import { PgIngredientInSetTable } from './PgIngredientInSetTable';
import { PgIngredientSetTable } from './PgIngredientSetTable';
import { PgIngredientTable } from './PgIngredientTable';
import { PgMenuInScheduleTable } from './PgMenuInScheduleTable';
import { PgMenuTable } from './PgMenuTable';
import { PgRecipeImageTable } from './PgRecipeImageTable';
import { PgRecipeTable } from './PgRecipeTable';
import { PgRoleTable } from './PgRoleTable';
import { PgScheduleTable } from './PgScheduleTable';
import { PgUserRoleTable } from './PgUserRoleTable';
import { PgUserTable } from './PgUserTable';

@metadata
export class PostgresDatabase extends Database {
  constructor(logger: Logger) {
    const pool = new Pool();
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
