const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

function getApiOrigin() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    return `https://${window.location.hostname.replace('-5173.', '-8000.')}`;
  }

  return 'http://localhost:8000';
}

export const apiOrigin = getApiOrigin();

export const apiBaseUrl = `${apiOrigin}/api`;

export function getEndpointUrl(endpointPath) {
  if (endpointPath.startsWith('http')) {
    return endpointPath;
  }

  return endpointPath.startsWith('/api/')
    ? `${apiOrigin}${endpointPath}`
    : `${apiBaseUrl}/${endpointPath}/`;
}

export function extractItems(responseBody, collectionName) {
  if (Array.isArray(responseBody)) {
    return responseBody;
  }

  const candidates = [
    responseBody?.[collectionName],
    responseBody?.results,
    responseBody?.items,
    responseBody?.data,
    responseBody?.data?.[collectionName],
    responseBody?.data?.results,
    responseBody?.data?.items,
  ];

  return candidates.find(Array.isArray) || [];
}

export async function fetchCollection(endpointPath, collectionName) {
  const response = await fetch(getEndpointUrl(endpointPath));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const responseBody = await response.json();
  return extractItems(responseBody, collectionName);
}