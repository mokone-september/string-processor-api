import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config(); // Load .env in development

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Zod schema for request validation
const requestSchema = z.object({
  data: z.string().min(1, 'The "data" field must be a non-empty string')
});

// Root GET route
app.get('/', (_req, res) => {
  res.send('Welcome to the String Processor API. Use POST /process-string');
});

// POST /process-string
app.post('/process-string', (req, res) => {
  const parsed = requestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.errors.map((e) => e.message).join(', ')
    });
  }

  const { data } = parsed.data;

  const result = {
    original: data,
    word: data.split('').sort().join('')
  };

  res.json(result);
});

// Run locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

export default app;
