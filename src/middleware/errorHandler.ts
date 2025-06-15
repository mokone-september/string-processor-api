import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import logger from '../logger';

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => e.message).join(', ');
    logger.warn(`Validation Error: ${messages}`);
    return res.status(400).json({ error: messages });
  }

  logger.error(`Unhandled Error: ${err.stack}`);
  res.status(500).json({
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { details: err.message })
  });
}

export default errorHandler;
