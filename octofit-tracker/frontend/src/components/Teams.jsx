import { ResourceState } from './ResourceState.jsx';
import { useCollection } from './useCollection.js';

function Teams() {
  const { items: teams, isLoading, error } = useCollection('teams');

  return (
    <section className="content-panel">
      <header className="panel-heading">
        <p className="eyebrow">Groups</p>
        <h2>Teams</h2>
      </header>
      <ResourceState isLoading={isLoading} error={error} isEmpty={teams.length === 0} resourceName="teams">
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id || team.name}>
              <h3>{team.name}</h3>
              <p>{team.motto}</p>
              <div className="chip-list">
                {(team.members || []).map((member) => (
                  <span className="chip" key={member._id || member.email || member.name}>{member.name || member}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  );
}

export default Teams;