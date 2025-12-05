
import { Request, Response } from 'express';


import { generateOpenRouterChat } from '../services/openrouter.service';
import { ConversationModel } from '../models/Conversation';


export async function getAiResponse(req: Request, res: Response) {
  const { conversationId } = req.body;
  if (!conversationId) return res.status(400).json({ error: 'conversationId required' });

  try {
    // Fetch all transcript segments for this conversationId, ordered by creation
    const segments = await ConversationModel.find({ conversationId }).sort({ createdAt: 1 });
    if (!segments.length) return res.status(404).json({ error: 'No transcript found for this conversation' });
    const fullTranscript = segments.map(s => s.transcript).join(' ');
    const prompt = `You are an AI assistant listening to a conversation. Here is the transcript: "${fullTranscript}". Please provide a helpful, context-aware response as if you were part of the discussion.`;
    const aiResponse = await generateOpenRouterChat(prompt);
    // Generate audio using Azure TTS
    const { textToSpeech } = await import('../services/azureTTS.service');
    const audioBuffer = await textToSpeech(aiResponse, 'en-US-JennyNeural');
    res.json({
      aiResponse,
      audio: audioBuffer.toString('base64'),
    });
    // Automatic cleanup: delete all transcript segments for this conversation
    await ConversationModel.deleteMany({ conversationId });
  } catch (error: any) {
    console.error('AI Response Error:', error, error?.response?.data);
    res.status(500).json({ error: error.message || 'Failed to get AI response.' });
  }
}
