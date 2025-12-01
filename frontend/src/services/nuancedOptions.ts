import type { NuancedOption } from '../types/nuanced';

export async function fetchNuancedOptions(context: string): Promise<NuancedOption[]> {
  const res = await fetch(`/api/nuanced-options`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context }),
  });
  if (!res.ok) throw new Error('Failed to fetch nuanced options');
  return res.json();
}
