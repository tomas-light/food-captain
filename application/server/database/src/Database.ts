import {
  DimensionTable,
  DishInMenuTable,
  DishInSetTable,
  DishSetTable,
  DishTable,
  ImageTable,
  IngredientInRecipeTable,
  IngredientInSetTable,
  IngredientSetTable,
  IngredientTable,
  MenuInScheduleTable,
  MenuTable,
  RecipeImageTable,
  RecipeTable,
  RoleTable,
  ScheduleTable,
  UserRoleTable,
  UserTable,
} from './tables';

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
