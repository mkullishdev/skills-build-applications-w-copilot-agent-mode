import { ResourceState } from './ResourceState.jsx';
import { useCollection } from './useCollection.js';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/';

function Leaderboard() {
  const { items: leaderboard, isLoading, error } = useCollection(leaderboardEndpoint, 'leaderboard');

  return (
    <section className="content-panel">
      <header className="panel-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </header>
      <ResourceState isLoading={isLoading} error={error} isEmpty={leaderboard.length === 0} resourceName="leaderboard entries">
        <ol className="leaderboard-list">
          {leaderboard.map((entry) => (
            <li key={entry._id}>
              <span className="rank">#{entry.rank}</span>
              <span>{entry.user?.name || 'Unknown user'}</span>
              <span>{entry.team?.name || 'No team'}</span>
              <strong>{entry.points} pts</strong>
            </li>
          ))}
        </ol>
      </ResourceState>
    </section>
  );
}

export default Leaderboard;