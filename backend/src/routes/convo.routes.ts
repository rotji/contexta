
import { Router } from 'express';
import { getConversations, saveConversation } from '../controllers/convo.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


const router = Router();

// Protect all conversation routes
router.get('/', authMiddleware, getConversations);
router.post('/', authMiddleware, saveConversation);

export default router;
