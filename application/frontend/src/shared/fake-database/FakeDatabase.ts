import type { Database } from '../database/';
import type { ActiveAuthTable } from './tables/ActiveAuthTable';
import type { DimensionTable } from './tables/DimensionTable';
import type { DishInMenuTable } from './tables/DishInMenuTable';
import type { ImageTable } from './tables/ImageTable';
import type { IngredientInRecipeTable } from './tables/IngredientInRecipeTable';
import type { IngredientTable } from './tables/IngredientTable';
import type { MenuInScheduleTable } from './tables/MenuInScheduleTable';
import type { MenuTable } from './tables/MenuTable';
import type { RecipeTable } from './tables/RecipeTable';
import type { RecipeTagTable } from './tables/RecipeTagTable';
import type { RoleTable } from './tables/RoleTable';
import type { ScheduleTable } from './tables/ScheduleTable';
import type { TagTable } from './tables/TagTable';
import type { UserRecipeLikesTable } from './tables/UserRecipeLikesTable';
import type { UserRoleTable } from './tables/UserRoleTable';
import type { UserTable } from './tables/UserTable';

export type FakeDatabaseSchema = {
  activeAuth: ActiveAuthTable;
  dimension: DimensionTable;
  dishInMenu: DishInMenuTable;
  image: ImageTable;
  ingredient: IngredientTable;
  ingredientInRecipe: IngredientInRecipeTable;
  menu: MenuTable;
  menuInSchedule: MenuInScheduleTable;
  recipe: RecipeTable;
  recipeTag: RecipeTagTable;
  role: RoleTable;
  schedule: ScheduleTable;
  tag: TagTable;
  user: UserTable;
  userRole: UserRoleTable;
  userRecipeLikes: UserRecipeLikesTable;
};

export type FakeDatabase = Database<FakeDatabaseSchema>;
