import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import logger from '../logger';

const router = Router();

const stringSchema = z.object({
  data: z.string().min(1, 'The "data" field must be a non-empty string'),
});

router.get('/', (_req, res) => {
  logger.debug('GET / called');
  res.send('Welcome to the String Processor API. Use POST /process-string');
});

router.post('/process-string', validate(stringSchema), (req, res) => {
  const { data } = req.body;
  const sorted = data.split('').sort();
  logger.info(`Sorted string: ${data} → ${sorted.join('')}`);
  res.json({ word: sorted });
});

router.post('/reverse-string', validate(stringSchema), (req, res) => {
  const { data } = req.body;
  const reversed = data.split('').reverse().join('');
  logger.info(`Reversed string: ${data} → ${reversed}`);
  res.json({ reversed });
});

export default router;
