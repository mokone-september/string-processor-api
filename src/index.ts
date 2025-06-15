import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security & performance middleware
app.use(helmet());         // Sets secure HTTP headers
app.use(compression());    // Gzip compress responses
app.use(cors());           // Enable CORS
app.use(express.json());   // Parse JSON bodies

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

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `✅ Server running in ${process.env.NODE_ENV} mode at: http://localhost:${PORT}`
    );
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

export default app;
