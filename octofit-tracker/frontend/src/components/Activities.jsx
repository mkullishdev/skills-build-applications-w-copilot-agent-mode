import { ResourceState } from './ResourceState.jsx';
import { useCollection } from './useCollection.js';

function Activities() {
  const { items: activities, isLoading, error } = useCollection('/api/activities/', 'activities');

  return (
    <section className="content-panel">
      <header className="panel-heading">
        <p className="eyebrow">Activity log</p>
        <h2>Activities</h2>
      </header>
      <ResourceState isLoading={isLoading} error={error} isEmpty={activities.length === 0} resourceName="activities">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Activity</th><th>User</th><th>Duration</th><th>Calories</th><th>Date</th></tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.user?.name || 'Unassigned'}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  );
}

export default Activities;