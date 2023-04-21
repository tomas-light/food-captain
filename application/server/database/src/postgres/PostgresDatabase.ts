import { Pool } from 'pg';
import { Logger } from '@food-captain/server-utils';
import { Database } from '../Database';
import {
  PgDimension,
  PgDishInMenu,
  PgImage,
  PgIngredientInRecipe,
  PgIngredient,
  PgMenuInSchedule,
  PgMenu,
  PgRecipeImage,
  PgRecipe,
  PgRole,
  PgSchedule,
  PgUserRole,
  PgUser,
  PgRecipeTag,
  PgTag,
} from './tables';

export class PostgresDatabase extends Database {
  constructor(private readonly logger: Logger, private readonly pool: Pool) {
    super(
      new PgDimension(logger, pool),
      new PgDishInMenu(logger, pool),
      new PgImage(logger, pool),
      new PgIngredient(logger, pool),
      new PgMenu(logger, pool),
      new PgMenuInSchedule(logger, pool),
      new PgRecipe(logger, pool),
      new PgRecipeImage(logger, pool),
      new PgRecipeTag(logger, pool),
      new PgIngredientInRecipe(logger, pool),
      new PgRole(logger, pool),
      new PgSchedule(logger, pool),
      new PgTag(logger, pool),
      new PgUser(logger, pool),
      new PgUserRole(logger, pool)
    );
  }
}
