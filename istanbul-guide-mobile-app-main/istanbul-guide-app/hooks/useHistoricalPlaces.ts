import { useEffect, useState } from "react";
import { getHistoricalPlaces } from "../services/places.services";
import { MapItem } from "../types/map";

export function useHistoricalPlaces() {
  const [places, setPlaces] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadPlaces() {
      try {
        setLoading(true);
        setError(null);

        const data = await getHistoricalPlaces();

        if (isActive) {
          setPlaces(data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error ? err.message : "Failed to load places"
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      isActive = false;
    };
  }, []);

  return {
    places,
    loading,
    error,
  };
}