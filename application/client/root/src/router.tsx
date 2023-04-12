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
import { AddIngredientPage } from '~/ingredient/AddIngredientPage';
import { EditIngredientPage } from '~/ingredient/EditIngredientPage';
import { IngredientPage } from '~/ingredient/IngredientPage';
import { appUrls } from './routing/appUrls';

const FallbackRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(appUrls.dish.url());
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
        element={<Navigate to={appUrls.dish.relativeUrl()} replace />}
      />

      <Route path={appUrls.dish.relativeUrl()}>
        {/* <Route index element={<DishPage />} />*/}
        <Route index element={<p>dish page</p>} />

        {/* <Route
          path={appUrls.dish.add.relativeUrl()}
          element={<AddDishPage />}
        />

        <Route path={appUrls.dish.dishId().relativeUrl()}>
          <Route
            path={appUrls.dish.dishId().edit.relativeUrl()}
            element={<EditDishPage />}
          />
          <Route index element={<DishDetailsPage />} />
        </Route>*/}
      </Route>

      <Route path={appUrls.menu.relativeUrl()}>
        <Route index element={<p>menu page</p>} />
      </Route>

      <Route path={appUrls.ingredient.relativeUrl()}>
        <Route index element={<IngredientPage />} />

        <Route
          path={appUrls.ingredient.add.relativeUrl()}
          element={<AddIngredientPage />}
        />

        <Route path={appUrls.ingredient.ingredientId().relativeUrl()}>
          <Route
            path={appUrls.ingredient.ingredientId().edit.relativeUrl()}
            element={<EditIngredientPage />}
          />
          {/* <Route index element={<IngredientDetailsPage />} />*/}
        </Route>
      </Route>

      <Route path="*" element={<FallbackRedirect />} />
    </Route>
  )
);
