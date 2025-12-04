
import { Request, Response } from 'express';
import { generateOpenRouterChat } from '../services/openrouter.service';


export async function getAiResponse(req: Request, res: Response) {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'Transcript required' });

  try {
    const prompt = `You are an AI assistant listening to a conversation. Here is the transcript: "${transcript}". Please provide a helpful, context-aware response as if you were part of the discussion.`;
    const aiResponse = await generateOpenRouterChat(prompt);
    // Generate audio using Azure TTS
    const { textToSpeech } = await import('../services/azureTTS.service');
    const audioBuffer = await textToSpeech(aiResponse);
    res.json({
      aiResponse,
      audio: audioBuffer.toString('base64'),
    });
  } catch (error: any) {
    console.error('AI Response Error:', error, error?.response?.data);
    res.status(500).json({ error: error.message || 'Failed to get AI response.' });
  }
}
