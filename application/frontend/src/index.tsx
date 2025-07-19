import { createRoot } from 'react-dom/client';

const element = document.querySelector('html > body > main');
if (element) {
  const root = createRoot(element);
  root.render(<p>Hello world</p>);
} else {
  // eslint-disable-next-line no-console
  console.warn('root element is not found in document');
}
