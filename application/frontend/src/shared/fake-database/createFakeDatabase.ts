import { createDatabase } from '../database/index';
import { databaseName, databaseVersion } from './consts';
import type { FakeDatabaseSchema } from './FakeDatabase';
import { initDimensionTable } from './tables/DimensionTable';
import { initDishInMenuTable } from './tables/DishInMenuTable';
import { initImageTable } from './tables/ImageTable';
import { initIngredientInRecipeTable } from './tables/IngredientInRecipeTable';
import { initIngredientTable } from './tables/IngredientTable';
import { initMenuInScheduleTable } from './tables/MenuInScheduleTable';
import { initMenuTable } from './tables/MenuTable';
import { initRecipeImageTable } from './tables/RecipeImageTable';
import { initRecipeTable } from './tables/RecipeTable';
import { initRecipeTagTable } from './tables/RecipeTagTable';
import { initRoleTable } from './tables/RoleTable';
import { initScheduleTable } from './tables/ScheduleTable';
import { initTagTable } from './tables/TagTable';
import { initUserRoleTable } from './tables/UserRoleTable';
import { initUserTable } from './tables/UserTable';

export async function createFakeDatabase() {
  return await createDatabase<FakeDatabaseSchema>({
    databaseName,
    databaseVersion,
    tableNames: names<FakeDatabaseSchema>({
      activeAuth: '',
      dimension: '',
      dishInMenu: '',
      image: '',
      ingredient: '',
      ingredientInRecipe: '',
      menu: '',
      menuInSchedule: '',
      recipe: '',
      recipeImage: '',
      recipeTag: '',
      role: '',
      schedule: '',
      tag: '',
      user: '',
      userRole: '',
    }),

    initialTransactions: async (database) => {
      const { saveDimensions } = initDimensionTable({ database });
      const { saveDishesInMenu } = initDishInMenuTable({ database });
      const { saveImages } = initImageTable({ database });
      const { saveIngredientsInRecipes } = initIngredientInRecipeTable({
        database,
      });
      const { saveIngredients } = initIngredientTable({ database });
      const { saveMenusInSchedule } = initMenuInScheduleTable({ database });
      const { saveMenus } = initMenuTable({ database });
      const { saveRecipeImages } = initRecipeImageTable({ database });
      const { saveRecipes } = initRecipeTable({ database });
      const { saveRecipeTags } = initRecipeTagTable({ database });
      const { saveRoles } = initRoleTable({ database });
      const { saveSchedules } = initScheduleTable({ database });
      const { saveTags } = initTagTable({ database });
      const { saveUserRoles } = initUserRoleTable({ database });
      const { saveUsers } = initUserTable({ database });

      saveDimensions();
      saveDishesInMenu();
      saveImages();
      saveIngredientsInRecipes();
      saveIngredients();
      saveMenusInSchedule();
      saveMenus();
      saveRecipeImages();
      saveRecipes();
      saveRecipeTags();
      saveRoles();
      saveSchedules();
      saveTags();
      saveUserRoles();
      saveUsers();
    },
  });
}

// just for type checking to be sure you don't forget to add all table names
function names<Schema>(schemaObject: {
  [tableName in keyof Schema]: '';
}) {
  return Array.from(Object.keys(schemaObject)) as Array<keyof Schema>;
}
