import {
  DimensionTable,
  DishInMenuTable,
  ImageTable,
  IngredientInRecipeTable,
  IngredientTable,
  MenuInScheduleTable,
  MenuTable,
  RecipeImageTable,
  RecipeTable,
  RecipeTagTable,
  RoleTable,
  ScheduleTable,
  TagTable,
  UserRoleTable,
  UserTable,
} from './tables';

export abstract class Database {
  constructor(
    readonly dimension: DimensionTable,
    readonly dishInMenu: DishInMenuTable,
    readonly image: ImageTable,
    readonly ingredient: IngredientTable,
    readonly menu: MenuTable,
    readonly menuInSchedule: MenuInScheduleTable,
    readonly recipe: RecipeTable,
    readonly recipeImage: RecipeImageTable,
    readonly recipeTag: RecipeTagTable,
    readonly ingredientInRecipe: IngredientInRecipeTable,
    readonly role: RoleTable,
    readonly schedule: ScheduleTable,
    readonly tag: TagTable,
    readonly user: UserTable,
    readonly userRole: UserRoleTable
  ) {
    if (new.target === Database) {
      throw new TypeError('Cannot construct Database instance directly');
    }
  }
}
