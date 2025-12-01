import { Router } from 'express';
import { getNuancedOptions } from '../controllers/nuanced.controller';

const router = Router();

router.post('/', getNuancedOptions);

export default router;
