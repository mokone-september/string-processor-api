import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { z } from 'zod';
import dotenv from 'dotenv';

import logger from './logger';
import errorHandler from './middleware/errorHandler';
import { validate } from './middleware/validate';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Zod schema
const requestSchema = z.object({
  data: z.string().min(1, 'The "data" field must be a non-empty string'),
});

// Routes
app.get('/', (_req, res) => {
  logger.debug('GET / called');
  res.send('Welcome to the String Processor API. Use POST /process-string');
});

app.post('/process-string', validate(requestSchema), (req, res) => {
  const { data } = req.body;
  const sortedArray = data.split('').sort();

  logger.info(`Processed string: ${data} → ${sortedArray.join('')}`);
  res.json({ word: sortedArray });
});

// Error handling middleware
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`✅ Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
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
