import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { enableMock } from "./useMockApi";

const api = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});
enableMock(api);

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface UseApiOptions extends AxiosRequestConfig {
  method?: HttpMethod;
  url: string;
  data?: any; // body for POST/PUT
  autoFetch?: boolean; // whether to run automatically
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (overrideData?: any, overrideParams?: any) => Promise<T | null>;
  retry: () => void;
}

export function useApi<T = unknown>({
  url,
  method = "get",
  data: body,
  params,
  autoFetch = false,
}: UseApiOptions): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (overrideData?: T, overrideParams?: any): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const config: AxiosRequestConfig = {
          method,
          url,
          params: overrideParams ?? params,
        };

        if (method !== "get") {
          config.data = overrideData ?? body;
        }

        const res: AxiosResponse<T> = await api.request(config);
        setData(res.data);
        await new Promise((res) => setTimeout(res, 500));
        return res.data;
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, params, body]
  );

  const retry = useCallback(() => execute(), [execute]);

  // Auto-fetch if enabled
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useState(() => {
    if (autoFetch) execute();
  });

  return { data, loading, error, execute, retry };
}
