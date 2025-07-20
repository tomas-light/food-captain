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
      recipeTag: '',
      role: '',
      schedule: '',
      tag: '',
      user: '',
      userRole: '',
    }),

    initialTransactions: async (database) => {
      const { dimensions, saveDimensions } = initDimensionTable({ database });
      const { recipes, saveRecipes } = initRecipeTable({ database });
      const { ingredients, saveIngredients } = initIngredientTable({
        database,
      });
      const { saveImages } = initImageTable({
        database,
        entitiesWithImages: [...recipes, ...ingredients],
      });
      const { saveIngredientsInRecipes } = initIngredientInRecipeTable({
        database,
        recipes,
        dimensions,
        ingredients,
      });
      const { users, saveUsers } = initUserTable({ database });
      const { saveRoles } = initRoleTable({ database });
      const { saveUserRoles } = initUserRoleTable({ database });
      const { saveMenus } = initMenuTable({ database, users });
      const { tags, saveTags } = initTagTable({ database });
      const { saveRecipeTags } = initRecipeTagTable({
        database,
        recipes,
        tags,
      });

      const { saveMenusInSchedule } = initMenuInScheduleTable({ database });
      const { saveDishesInMenu } = initDishInMenuTable({ database });
      const { saveSchedules } = initScheduleTable({ database });

      saveDimensions();
      saveDishesInMenu();
      saveImages();
      saveIngredientsInRecipes();
      saveIngredients();
      saveMenusInSchedule();
      saveMenus();
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
