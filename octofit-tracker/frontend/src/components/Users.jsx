import { ResourceState } from './ResourceState.jsx';
import { useCollection } from './useCollection.js';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/';

function Users() {
  const { items: users, isLoading, error } = useCollection(usersEndpoint, 'users');

  return (
    <section className="content-panel">
      <header className="panel-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </header>
      <ResourceState isLoading={isLoading} error={error} isEmpty={users.length === 0} resourceName="users">
        <div className="data-grid user-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.email}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <dl>
                <div><dt>Role</dt><dd>{user.role}</dd></div>
                <div><dt>Age</dt><dd>{user.age}</dd></div>
                <div><dt>Goal</dt><dd>{user.fitnessGoal}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  );
}

export default Users;