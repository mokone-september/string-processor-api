import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { z } from 'zod';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Zod schema for request validation
const processStringSchema = z.object({
  data: z.string(),
});

// Health check
app.get('/', (_req: Request, res: Response) => res.send('API Ready'));

// Main endpoint
app.post('/process-string', (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = processStringSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ error: 'Send { "data": "string" }' });
    }

    const { data } = parseResult.data;

    const result = {
      original: data,
      word: data.trim().split('').sort()
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});