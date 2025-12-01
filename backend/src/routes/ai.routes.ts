import { Router } from 'express';
import { getAiResponse } from '../controllers/ai.controller';

const router = Router();

router.post('/response', getAiResponse);

export default router;
