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
import { SomePage } from '~/SomePage';
import { appUrls } from './routing/appUrls';

const FallbackRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(appUrls.some.url());
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
        element={<Navigate to={appUrls.some.relativeUrl()} replace />}
      />
      <Route path={appUrls.some.relativeUrl()} element={<SomePage />} />

      <Route path="*" element={<FallbackRedirect />} />
    </Route>
  )
);
