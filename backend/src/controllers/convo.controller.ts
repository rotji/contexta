

import { Request, Response } from 'express';
import { ConversationModel } from '../models/Conversation';
import { AuthRequest } from '../middlewares/auth.middleware';



export async function getConversations(req: AuthRequest, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const userConvos = await ConversationModel.find({ userId }).sort({ createdAt: -1 });
    res.json(userConvos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}



export async function saveConversation(req: AuthRequest, res: Response) {
  const { transcript, aiResponse, nuancedOptions } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!transcript) return res.status(400).json({ error: 'Transcript required' });
  try {
    const convo = await ConversationModel.create({
      userId,
      transcript,
      aiResponse: aiResponse || '',
      nuancedOptions: nuancedOptions || [],
    });
    res.status(201).json(convo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save conversation' });
  }
}
