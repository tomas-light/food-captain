import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

const root = createRoot(rootElement);
root.render(<Root />);

function Root() {
  useEffect(() => {
    fetch('/api/check');
  }, []);

  return <p>Hello Food Captain!</p>;
}
