const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getEndpointUrl(collectionName) {
  return `${apiBaseUrl}/${collectionName}/`;
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

export async function fetchCollection(collectionName) {
  const response = await fetch(getEndpointUrl(collectionName));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const responseBody = await response.json();
  return extractItems(responseBody, collectionName);
}