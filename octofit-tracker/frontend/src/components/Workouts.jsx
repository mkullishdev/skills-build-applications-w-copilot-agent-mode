import { ResourceState } from './ResourceState.jsx';
import { useCollection } from './useCollection.js';

function Workouts() {
  const { items: workouts, isLoading, error } = useCollection('/api/workouts/', 'workouts');

  return (
    <section className="content-panel">
      <header className="panel-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </header>
      <ResourceState isLoading={isLoading} error={error} isEmpty={workouts.length === 0} resourceName="workouts">
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id || workout.title}>
              <h3>{workout.title}</h3>
              <p>{workout.recommendedForGoal}</p>
              <dl>
                <div><dt>Focus</dt><dd>{workout.focusArea}</dd></div>
                <div><dt>Level</dt><dd>{workout.difficulty}</dd></div>
                <div><dt>Time</dt><dd>{workout.durationMinutes} min</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  );
}

export default Workouts;