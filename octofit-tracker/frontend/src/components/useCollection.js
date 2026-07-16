import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export function useCollection(endpointPath, collectionName) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    async function loadItems() {
      try {
        setIsLoading(true);
        setError(null);
        const loadedItems = await fetchCollection(endpointPath, collectionName);

        if (isActive) {
          setItems(loadedItems);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isActive = false;
    };
  }, [collectionName, endpointPath]);

  return { items, isLoading, error };
}