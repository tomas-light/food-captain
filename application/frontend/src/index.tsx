import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './app/config/router';

const element = document.querySelector('html > body > main');
if (element) {
  const root = createRoot(element);
  root.render(<RouterProvider router={router} />);
} else {
  console.warn('root element is not found in document');
}
