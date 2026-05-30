import { useState, useEffect, useCallback } from 'react';
import API from '../sevices/api';
/**
 * Custom hook for executing optimized, component-safe asynchronous GET network requests.
 * @param {string} url - Target backend endpoint context path sequence string.
 * @returns {Object} - Destructurable collection holding data, loading states, error responses, and manual reload controls.
 */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetchPipeline = useCallback(async (abortController) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(url, {
        signal: abortController?.signal
      });
      setData(response.data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.response?.data?.message || 'Network framework execution pipeline fault.');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    executeFetchPipeline(controller);

    return () => {
      controller.abort(); // Cancel active pipeline stream on component unmount
    };
  }, [executeFetchPipeline]);

  const refetch = () => executeFetchPipeline();

  return { data, loading, error, refetch };
}