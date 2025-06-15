import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Zod schema for request validation
const requestSchema = z.object({
  data: z.string().min(1, 'The "data" field must be a non-empty string'),
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
      error: parsed.error.errors.map((e) => e.message).join(', '),
    });
  }

  const { data } = parsed.data;
  const sortedArray = data.split('').sort();

  res.json({ word: sortedArray });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `✅ Server running in ${process.env.NODE_ENV} mode at: http://localhost:${PORT}`
    );
  });
}

export default app;
