import { useState, useEffect, useCallback } from "react";
import { fetchNui } from "../fetchNui";

interface NuiQueryOptions {
  enabled?: boolean;
}

export function useNuiQuery<T>(
  action: string,
  payload?: any,
  options: NuiQueryOptions = {},
) {
  const { enabled = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);

  const serializedPayload = payload ? JSON.stringify(payload) : null;

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchNui<T>(action, payload);
      setData(result);
    } catch (err: any) {
      setError(err.message || `Failed to fetch: ${action}`);
    } finally {
      setIsLoading(false);
    }
  }, [action, serializedPayload]);

  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled, refetch]);

  return { data, isLoading, error, refetch };
}
