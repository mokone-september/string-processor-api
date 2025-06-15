import { Request, Response, NextFunction } from 'express';
import logger from '../logger'; // import the logger

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(`Unhandled Error: ${err.stack}`);

  res.status(500).json({
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { details: err.message })
  });
}

export default errorHandler;
