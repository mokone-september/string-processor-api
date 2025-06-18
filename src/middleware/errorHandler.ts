import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
}

export default errorHandler;
