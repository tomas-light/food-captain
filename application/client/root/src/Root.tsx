import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

const root = createRoot(rootElement);
root.render(<Root />);

function Root() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://api.food-captain.localhost/check');
    (async () => {
      const response = await fetch('https://api.food-captain.localhost/users');
      const usersData = await response.json();
      setUsers(usersData);
    })();
  }, []);

  return (
    <div>
      <p>Hello Food Captain!</p>
      {users &&
        Array.isArray(users) &&
        users.map((user) => (
          <p key={JSON.stringify(user)}>{JSON.stringify(user, null, 2)}</p>
        ))}
    </div>
  );
}
