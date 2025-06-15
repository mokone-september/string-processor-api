import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(err);
      } else {
        next(new Error('Unexpected validation error'));
      }
    }
  };
