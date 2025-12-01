import { useState } from 'react';
import type { NuancedOption } from '../types/nuanced';
import { fetchNuancedOptions } from '../services/nuancedOptions';

export function useNuancedOptions() {
  const [options, setOptions] = useState<NuancedOption[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNuancedOptions = async (context: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchNuancedOptions(context);
      setOptions(result);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch nuanced options');
    } finally {
      setLoading(false);
    }
  };

  return { options, loading, error, getNuancedOptions };
}
