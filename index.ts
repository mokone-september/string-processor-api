import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './src/middleware/errorHandler';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (_req: Request, res: Response) => res.send('API Ready'));

// Main endpoint
app.post('/process-string', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = req.body;

    if (typeof data !== 'string') {
      return res.status(400).json({ error: 'Send { "data": "string" }' });
    }

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
