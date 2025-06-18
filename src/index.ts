import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

import logger from './logger';
import errorHandler from './middleware/errorHandler';
import stringRoutes from './routes/stringRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

app.use('/', stringRoutes);

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`✅ Server running at http://localhost:${PORT}`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`❌ Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

// Required for Vercel's serverless function
module.exports = app;
