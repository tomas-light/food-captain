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
import { AddDishPage } from '~/management/dish/AddDishPage';
import { DishDetailsPage } from '~/management/dish/DishDetailsPage';
import { EditDishPage } from '~/management/dish/EditDishPage';
import { AddIngredientPage } from '~/management/ingredient/AddIngredientPage';
import { EditIngredientPage } from '~/management/ingredient/EditIngredientPage';
import { IngredientsPage } from '~/management/ingredient/IngredientsPage';
import { DishPage } from './management/dish/DishPage';
import { appUrls } from './routing/appUrls';

const FallbackRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(appUrls.management.dish.url());
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

        <Route path={appUrls.management.dish.relativeUrl()}>
          <Route index element={<DishPage />} />

          <Route
            path={appUrls.management.dish.add.relativeUrl()}
            element={<AddDishPage />}
          />

          <Route path={appUrls.management.dish.dishId().relativeUrl()}>
            <Route
              path={appUrls.management.dish.dishId().edit.relativeUrl()}
              element={<EditDishPage />}
            />
            <Route index element={<DishDetailsPage />} />
          </Route>
        </Route>

        <Route path={appUrls.management.menu.relativeUrl()}>
          <Route index element={<p>menu page</p>} />
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
        <Route index element={<p>Randomizer page</p>} />
      </Route>

      <Route path="*" element={<FallbackRedirect />} />
    </Route>
  )
);
