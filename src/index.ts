import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { z } from 'zod';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Zod validation schema
const requestSchema = z.object({
  data: z.string().min(1, 'The "data" field must be a non-empty string'),
});

// Root route
app.get('/', (_req, res) => {
  logger.debug('GET / called');
  res.send('Welcome to the String Processor API. Use POST /process-string');
});

// POST endpoint
app.post('/process-string', (req, res) => {
  logger.debug('POST /process-string received:', req.body);

  const parsed = requestSchema.safeParse(req.body);

  if (!parsed.success) {
    const errorMsg = parsed.error.errors.map((e) => e.message).join(', ');
    logger.warn(`Validation failed: ${errorMsg}`);
    return res.status(400).json({ error: errorMsg });
  }

  const { data } = parsed.data;
  const sortedArray = data.split('').sort();

  logger.info(`Processed string: ${data} → ${sortedArray.join('')}`);

  res.json({ word: sortedArray });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(
      `✅ Server running in ${process.env.NODE_ENV} mode at: http://localhost:${PORT}`
    );
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`❌ Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

export default app;
