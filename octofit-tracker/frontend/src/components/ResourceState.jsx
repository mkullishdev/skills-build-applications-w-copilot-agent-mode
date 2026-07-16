export function ResourceState({ isLoading, error, isEmpty, resourceName, children }) {
  if (isLoading) {
    return <p className="resource-state">Loading {resourceName}...</p>;
  }

  if (error) {
    return <p className="resource-state error">Unable to load {resourceName}: {error.message}</p>;
  }

  if (isEmpty) {
    return <p className="resource-state">No {resourceName} found.</p>;
  }

  return children;
}