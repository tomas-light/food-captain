import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  useNavigate,
} from 'react-router-dom';
import { App } from '~/App';
import { ManagementPage } from '~/management';
import { AddIngredientPage } from '~/management/ingredient/AddIngredientPage';
import { EditIngredientPage } from '~/management/ingredient/EditIngredientPage';
import { IngredientsPage } from '~/management/ingredient/IngredientsPage';
import { AddRecipePage } from '~/management/recipe/AddRecipePage';
import { EditRecipePage } from '~/management/recipe/EditRecipePage';
import { RandomRecipePage } from '~/management/recipe/RandomRecipePage';
import { RecipeDetailsPage } from '~/management/recipe/RecipeDetailsPage';
import { RecipesPage } from './management/recipe/RecipesPage';
import { appUrls } from './routing/appUrls';

const FallbackRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(appUrls.management.recipe.url());
  }, []);

  return null;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={appUrls.url()}
      element={
        <App>
          <Outlet />
        </App>
      }
    >
      <Route
        index
        element={<Navigate to={appUrls.management.relativeUrl()} replace />}
      />

      <Route path={appUrls.management.relativeUrl()}>
        <Route index element={<ManagementPage />} />

        <Route path={appUrls.management.recipe.relativeUrl()}>
          <Route index element={<RecipesPage />} />

          <Route
            path={appUrls.management.recipe.add.relativeUrl()}
            element={<AddRecipePage />}
          />

          <Route path={appUrls.management.recipe.recipeId().relativeUrl()}>
            <Route
              path={appUrls.management.recipe.recipeId().edit.relativeUrl()}
              element={<EditRecipePage />}
            />
            <Route index element={<RecipeDetailsPage />} />
          </Route>
        </Route>

        <Route path={appUrls.management.ingredient.relativeUrl()}>
          <Route index element={<IngredientsPage />} />

          <Route
            path={appUrls.management.ingredient.add.relativeUrl()}
            element={<AddIngredientPage />}
          />

          <Route
            path={appUrls.management.ingredient.ingredientId().relativeUrl()}
          >
            <Route
              path={appUrls.management.ingredient
                .ingredientId()
                .edit.relativeUrl()}
              element={<EditIngredientPage />}
            />
            {/* <Route index element={<IngredientDetailsPage />} />*/}
          </Route>
        </Route>
      </Route>

      <Route path={appUrls.randomizer.relativeUrl()}>
        <Route index element={<RandomRecipePage />} />
      </Route>

      <Route path="*" element={<FallbackRedirect />} />
    </Route>
  )
);
