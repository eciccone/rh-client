import { useState } from "react"

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const request = async (...args) => {
    if (!fetched) {
      setLoading(true);
      try {
        const result = await apiFunc(...args);
        const json = await result.json();

        if (!result.ok) {
          const err = new Error(json.msg);
          throw err;
        }

        setData(json);
      } catch (err) {
        setError(err.message || "Unexpected Error");
      } finally {
        setLoading(false);
        setFetched(true);
      }
    }
  };

  return {
    data,
    error,
    loading,
    request
  };
};