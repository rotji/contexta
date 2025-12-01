
import { Request, Response } from 'express';
import { conversations, Conversation } from '../models/Conversation';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middlewares/auth.middleware';


export function getConversations(req: AuthRequest, res: Response) {
  // Only return conversations for the authenticated user
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const userConvos = conversations.filter(c => c.userId === userId);
  res.json(userConvos);
}


export function saveConversation(req: AuthRequest, res: Response) {
  const { transcript, aiResponse, nuancedOptions } = req.body;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!transcript) return res.status(400).json({ error: 'Transcript required' });
  const convo: Conversation = {
    id: uuidv4(),
    userId,
    createdAt: new Date(),
    transcript,
    aiResponse: aiResponse || '',
    nuancedOptions: nuancedOptions || [],
  };
  conversations.unshift(convo); // Add to start for recency
  res.status(201).json(convo);
}
