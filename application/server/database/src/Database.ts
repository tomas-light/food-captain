import { DimensionTable } from './DimensionTable';
import { DishInMenuTable } from './DishInMenuTable';
import { DishInSetTable } from './DishInSetTable';
import { DishSetTable } from './DishSetTable';
import { DishTable } from './DishTable';
import { ImageTable } from './ImageTable';
import { IngredientInRecipeTable } from './IngredientInRecipeTable';
import { IngredientInSetTable } from './IngredientInSetTable';
import { IngredientSetTable } from './IngredientSetTable';
import { IngredientTable } from './IngredientTable';
import { MenuInScheduleTable } from './MenuInScheduleTable';
import { MenuTable } from './MenuTable';
import { RecipeImageTable } from './RecipeImageTable';
import { RecipeTable } from './RecipeTable';
import { RoleTable } from './RoleTable';
import { ScheduleTable } from './ScheduleTable';
import { UserRoleTable } from './UserRoleTable';
import { UserTable } from './UserTable';

export abstract class Database {
  constructor(
    readonly dimension: DimensionTable,
    readonly dish: DishTable,
    readonly dishInMenu: DishInMenuTable,
    readonly dishInSet: DishInSetTable,
    readonly dishSet: DishSetTable,
    readonly image: ImageTable,
    readonly ingredient: IngredientTable,
    readonly ingredientInSet: IngredientInSetTable,
    readonly ingredientSet: IngredientSetTable,
    readonly menu: MenuTable,
    readonly menuInSchedule: MenuInScheduleTable,
    readonly recipe: RecipeTable,
    readonly recipeImage: RecipeImageTable,
    readonly ingredientInRecipe: IngredientInRecipeTable,
    readonly role: RoleTable,
    readonly schedule: ScheduleTable,
    readonly user: UserTable,
    readonly userRole: UserRoleTable
  ) {
    if (new.target === Database) {
      throw new TypeError('Cannot construct Database instance directly');
    }
  }
}
