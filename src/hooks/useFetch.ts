import React from "react";

export function useFetch<T>(endpoint: `/${string}`, config: RequestInit) {
  const [data, setData] = React.useState<T>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchData = React.useCallback(async () => {
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        { ...config, credentials: "include" }
      );
      const json = await resp.json<T>();
      if (json) setData(json);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  }, [endpoint, config]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, isLoading, error, setData, setIsLoading, refetch: fetchData };
}
