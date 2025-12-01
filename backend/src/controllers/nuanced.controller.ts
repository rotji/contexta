import { Request, Response } from 'express';
import { generateNuancedOptions } from '../services/nuanced.service';

export async function getNuancedOptions(req: Request, res: Response) {
  const { context } = req.body;
  if (!context) return res.status(400).json({ error: 'Missing context' });
  try {
    const options = await generateNuancedOptions(context);
    res.json(options);
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Failed to generate nuanced options' });
  }
}
